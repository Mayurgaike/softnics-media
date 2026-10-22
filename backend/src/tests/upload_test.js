const fs = require("fs");
const path = require("path");
const http = require("http");
const app = require("../app");
const { UPLOADS_ROOT } = require("../config/upload");

async function testUploadWorkflow() {
  console.log("=== Testing Image Upload & Safe Replacement Workflow ===");

  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1. Login to get token
    const loginData = JSON.stringify({ email: "admin@softnicsmedia.com", password: "SoftnicsM@admin$" });
    const token = await new Promise((resolve, reject) => {
      const req = http.request(`${baseUrl}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" } }, (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => resolve(JSON.parse(body).token));
      });
      req.on("error", reject);
      req.write(loginData);
      req.end();
    });

    // 2. Prepare test PNG image
    // 1x1 transparent PNG buffer
    const pngBuffer = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");
    const boundary = "---------------------------testboundary" + Date.now();

    const makeMultipartBody = (fields, fileField, filename, fileBuffer, b = boundary) => {
      let parts = [];
      for (const [k, v] of Object.entries(fields)) {
        parts.push(`--${b}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`);
      }
      if (fileField && fileBuffer) {
        parts.push(`--${b}\r\nContent-Disposition: form-data; name="${fileField}"; filename="${filename}"\r\nContent-Type: image/png\r\n\r\n`);
      }
      const header = Buffer.from(parts.join(""));
      const footer = Buffer.from(`\r\n--${b}--\r\n`);
      if (fileField && fileBuffer) {
        return Buffer.concat([header, fileBuffer, footer]);
      }
      return Buffer.concat([header, footer]);
    };

    // 3. Create service with image 1
    const body1 = makeMultipartBody(
      { title: "Upload Test Service", slug: `upload-test-${Date.now()}`, status: "published" },
      "image",
      "test_img_1.png",
      pngBuffer
    );

    const createRes = await new Promise((resolve, reject) => {
      const req = http.request(`${baseUrl}/api/admin/services`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          "Content-Length": body1.length,
        },
      }, (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
      });
      req.on("error", reject);
      req.write(body1);
      req.end();
    });

    if (createRes.status !== 201) {
      throw new Error("Failed to create service with image: " + JSON.stringify(createRes.data));
    }

    const serviceId = createRes.data.id;
    const initialImagePath = createRes.data.rawImage || (createRes.data.image && createRes.data.image.split("/uploads/")[1]);
    console.log("✅ Created service with image:", initialImagePath);

    const fullDiskPath1 = path.resolve(UPLOADS_ROOT, initialImagePath);
    if (!fs.existsSync(fullDiskPath1)) {
      throw new Error("File not found on disk: " + fullDiskPath1);
    }
    console.log("✅ Verified file exists on disk:", fullDiskPath1);

    // 4. Update service with image 2 (should delete image 1 from disk)
    const boundary2 = "---------------------------boundary2" + Date.now();
    const body2 = makeMultipartBody(
      { title: "Upload Test Service Updated" },
      "image",
      "test_img_2.png",
      pngBuffer,
      boundary2
    );

    const updateRes = await new Promise((resolve, reject) => {
      const req = http.request(`${baseUrl}/api/admin/services/${serviceId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data; boundary=${boundary2}`,
          "Content-Length": body2.length,
        },
      }, (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
      });
      req.on("error", reject);
      req.write(body2);
      req.end();
    });

    if (updateRes.status !== 200) {
      throw new Error("Failed to update service with new image: " + JSON.stringify(updateRes.data));
    }

    const updatedImagePath = updateRes.data.service.image && updateRes.data.service.image.split("/uploads/")[1];
    console.log("✅ Updated service with new image:", updatedImagePath);

    // Check that old image was removed
    const oldFileStillExists = fs.existsSync(fullDiskPath1);
    console.log("Old file deleted from disk:", !oldFileStillExists);
    if (oldFileStillExists) {
      throw new Error("Old image file was not deleted on replacement!");
    }

    // Clean up test service and new image
    const fullDiskPath2 = path.resolve(UPLOADS_ROOT, updatedImagePath);
    if (fs.existsSync(fullDiskPath2)) fs.unlinkSync(fullDiskPath2);
    await db.Service.destroy({ where: { id: serviceId }, force: true });

    console.log("🎉 ALL IMAGE UPLOAD & REPLACEMENT TESTS PASSED! ✅");
  } finally {
    server.close();
    process.exit(0);
  }
}

testUploadWorkflow().catch((err) => {
  console.error("❌ UPLOAD TEST FAILED:", err);
  process.exit(1);
});
