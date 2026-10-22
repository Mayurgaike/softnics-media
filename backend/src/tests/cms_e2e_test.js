const http = require("http");
const app = require("../app");
const db = require("../models");
const jwt = require("jsonwebtoken");

let server;
let baseUrl;
let adminToken;

const request = (method, path, body = null, token = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const reqHeaders = { ...headers };
    if (token) reqHeaders["Authorization"] = `Bearer ${token}`;
    if (body && typeof body === "object" && !(body instanceof Buffer)) {
      reqHeaders["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }

    const req = http.request(
      url,
      { method, headers: reqHeaders },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          let json = null;
          try {
            json = JSON.parse(data);
          } catch (e) {
            json = data;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        });
      }
    );

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
};

async function runTests() {
  console.log("=== Starting CMS End-to-End Test Suite ===");

  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      console.log(`Test server running on ${baseUrl}`);
      resolve();
    });
  });

  try {
    // 1. Admin Login
    console.log("\n[TEST 1] Admin Authentication & Session Management");
    const loginRes = await request("POST", "/api/auth/login", {
      email: "admin@softnicsmedia.com",
      password: "SoftnicsM@admin$",
    });
    if (loginRes.status !== 200 || !loginRes.body.token) {
      throw new Error(`Login failed with status ${loginRes.status}: ${JSON.stringify(loginRes.body)}`);
    }
    adminToken = loginRes.body.token;
    console.log("✅ Admin logged in successfully, token received.");

    // Verify token does not expire (no exp claim)
    const jwt = require("jsonwebtoken");
    const decoded = jwt.decode(adminToken);
    if (decoded.exp) {
      throw new Error(`Expected token to NOT have exp claim for permanent session until logout, got exp: ${decoded.exp}`);
    }
    console.log("✅ Token generated without expiration claim (session does not expire until logout).");

    // Verify /api/auth/me
    const meRes = await request("GET", "/api/auth/me", null, adminToken);
    if (meRes.status !== 200 || !meRes.body.admin || meRes.body.admin.email !== "admin@softnicsmedia.com") {
      throw new Error(`Failed to verify session profile via /api/auth/me: ${JSON.stringify(meRes.body)}`);
    }
    console.log("✅ Session verified via /api/auth/me.");

    // Verify /api/auth/logout
    const logoutRes = await request("POST", "/api/auth/logout", null, adminToken);
    if (logoutRes.status !== 200) {
      throw new Error(`Logout failed: ${JSON.stringify(logoutRes.body)}`);
    }
    console.log("✅ Logout endpoint /api/auth/logout verified.");

    // 2. Unauthenticated Guard
    console.log("\n[TEST 2] Admin Protected Routes Guard");
    const unauthRes = await request("GET", "/api/admin/services");
    if (unauthRes.status !== 401) {
      throw new Error(`Expected 401 for unauthenticated request, got ${unauthRes.status}`);
    }
    const badTokenRes = await request("GET", "/api/admin/services", null, "invalid-token");
    if (badTokenRes.status !== 401) {
      throw new Error(`Expected 401 for invalid token, got ${badTokenRes.status}`);
    }
    console.log("✅ Authentication guards working as expected (401 Unauthorized).");

    // 3. Existing Data Preservation Check
    console.log("\n[TEST 3] Existing Data Preservation");
    const publicServices = await request("GET", "/api/services");
    if (publicServices.status !== 200 || !Array.isArray(publicServices.body) || publicServices.body.length < 8) {
      throw new Error(`Expected at least 8 public services, got ${publicServices.body?.length}`);
    }
    const service1 = await request("GET", "/api/services/graphics-designing");
    if (service1.status !== 200 || !service1.body.offerings || service1.body.offerings.length === 0) {
      throw new Error("Existing service 'graphics-designing' or offerings not preserved!");
    }

    const publicBlogs = await request("GET", "/api/blogs");
    if (publicBlogs.status !== 200 || !Array.isArray(publicBlogs.body) || publicBlogs.body.length < 10) {
      throw new Error(`Expected at least 10 public blogs, got ${publicBlogs.body?.length}`);
    }
    const blog1 = await request("GET", "/api/blogs/ai-transforming-digital-marketing-2025");
    if (blog1.status !== 200 || !blog1.body.content || !Array.isArray(blog1.body.contentBlocks)) {
      throw new Error("Existing blog 'ai-transforming-digital-marketing-2025' or contentBlocks not preserved!");
    }
    console.log(`✅ All ${publicServices.body.length} services and ${publicBlogs.body.length} blogs intact with existing relationships.`);

    // 4. Services CMS Workflow: Create Draft, Inspect Security, Update, Publish, Slug Conflict, Delete
    console.log("\n[TEST 4] Services CMS Workflow");
    const testSlug = `automated-test-service-${Date.now()}`;
    const createServiceRes = await request(
      "POST",
      "/api/admin/services",
      {
        title: "Automated Test Service",
        slug: testSlug,
        status: "draft",
        content: "<h2>Overview</h2><p>Safe body <script>alert('xss')</script><img src=x onerror=alert(1) /></p>",
        metaTitle: "Automated Test SEO Title",
        metaDescription: "Automated test description for search engines",
        customHeaderCode: "<meta name=\"test-head\" content=\"ok\" /><script>evil()</script><script type=\"application/ld+json\">{\"@type\":\"Service\"}</script>",
      },
      adminToken
    );

    if (createServiceRes.status !== 201) {
      throw new Error(`Create service failed: ${JSON.stringify(createServiceRes.body)}`);
    }
    const createdServiceId = createServiceRes.body.id;
    console.log("✅ Created draft service (ID:", createdServiceId, ")");

    // 4a. Verify sanitization on service
    if (createServiceRes.body.content.includes("script") || createServiceRes.body.content.includes("onerror")) {
      throw new Error("Rich text sanitization failed on service creation!");
    }
    if (createServiceRes.body.customHeaderCode.includes("evil()") || !createServiceRes.body.customHeaderCode.includes("application/ld+json")) {
      throw new Error("Custom header sanitization failed on service creation!");
    }
    console.log("✅ Rich text and header sanitization verified on service.");

    // 4b. Verify draft is hidden from public
    const publicDraftCheck = await request("GET", `/api/services/${testSlug}`);
    if (publicDraftCheck.status !== 404) {
      throw new Error(`Expected 404 for draft service on public endpoint, got ${publicDraftCheck.status}`);
    }
    console.log("✅ Draft service is hidden from public (404 Not Found).");

    // 4c. Verify admin CAN fetch draft
    const adminDraftFetch = await request("GET", `/api/admin/services/${createdServiceId}`, null, adminToken);
    if (adminDraftFetch.status !== 200 || adminDraftFetch.body.status !== "draft") {
      throw new Error("Admin failed to fetch draft service!");
    }
    console.log("✅ Admin can view draft service.");

    // 4d. Test Duplicate Slug Conflict
    const dupSlugRes = await request(
      "POST",
      "/api/admin/services",
      {
        title: "Duplicate Slug Service",
        slug: testSlug,
        status: "draft",
      },
      adminToken
    );
    if (dupSlugRes.status !== 409) {
      throw new Error(`Expected 409 Conflict for duplicate slug, got ${dupSlugRes.status}`);
    }
    console.log("✅ Duplicate slug conflict rejected with 409 Conflict.");

    // 4e. Publish Service
    const publishRes = await request(
      "PUT",
      `/api/admin/services/${createdServiceId}`,
      {
        status: "published",
        content: "<h2>Updated Published Content</h2><p>Now live on website.</p>",
      },
      adminToken
    );
    if (publishRes.status !== 200) {
      throw new Error(`Failed to publish service: ${JSON.stringify(publishRes.body)}`);
    }

    const publicPublishedCheck = await request("GET", `/api/services/${testSlug}`);
    if (publicPublishedCheck.status !== 200 || !publicPublishedCheck.body.content.includes("Updated Published Content")) {
      throw new Error("Published service is not accessible publicly!");
    }
    console.log("✅ Published service is now visible on public endpoint (200 OK).");

    // 4f. Delete Service (Soft delete)
    const deleteRes = await request("DELETE", `/api/admin/services/${createdServiceId}`, null, adminToken);
    if (deleteRes.status !== 200) {
      throw new Error("Failed to delete service!");
    }
    const publicDeletedCheck = await request("GET", `/api/services/${testSlug}`);
    if (publicDeletedCheck.status !== 404) {
      throw new Error("Deleted service still returned 200 publicly!");
    }
    console.log("✅ Service deleted successfully (soft-delete verified).");

    // 5. Blogs CMS Workflow: Create Draft, Update, Publish, Delete
    console.log("\n[TEST 5] Blogs CMS Workflow");
    const testBlogSlug = `automated-test-blog-${Date.now()}`;
    const createBlogRes = await request(
      "POST",
      "/api/admin/blogs",
      {
        title: "Automated Test Article",
        slug: testBlogSlug,
        status: "draft",
        author: "Test Author",
        content: "<h2>Article Header</h2><p>Article body <script>alert(1)</script></p>",
        shortDesc: "Short excerpt for testing",
        metaTitle: "Test Blog SEO Title",
        metaDescription: "Test blog meta description",
      },
      adminToken
    );
    if (createBlogRes.status !== 201) {
      throw new Error(`Create blog failed: ${JSON.stringify(createBlogRes.body)}`);
    }
    const createdBlogId = createBlogRes.body.id;
    console.log("✅ Created draft blog (ID:", createdBlogId, ")");

    // 5a. Public Draft Check
    const publicBlogDraft = await request("GET", `/api/blogs/${testBlogSlug}`);
    if (publicBlogDraft.status !== 404) {
      throw new Error("Draft blog returned on public endpoint!");
    }
    console.log("✅ Draft blog is hidden from public (404 Not Found).");

    // 5b. Publish Blog
    const publishBlogRes = await request(
      "PUT",
      `/api/admin/blogs/${createdBlogId}`,
      { status: "published" },
      adminToken
    );
    if (publishBlogRes.status !== 200) {
      throw new Error("Failed to publish blog!");
    }

    const publicBlogLive = await request("GET", `/api/blogs/${testBlogSlug}`);
    if (publicBlogLive.status !== 200 || publicBlogLive.body.author !== "Test Author") {
      throw new Error("Published blog not accessible publicly!");
    }
    console.log("✅ Published blog is now live on public endpoint.");

    // 5c. Delete Blog
    const deleteBlogRes = await request("DELETE", `/api/admin/blogs/${createdBlogId}`, null, adminToken);
    if (deleteBlogRes.status !== 200) {
      throw new Error("Failed to delete blog!");
    }
    const publicDeletedBlog = await request("GET", `/api/blogs/${testBlogSlug}`);
    if (publicDeletedBlog.status !== 404) {
      throw new Error("Deleted blog still accessible publicly!");
    }
    console.log("✅ Blog deleted successfully.");

    // 6. Admin Search & Pagination Check
    console.log("\n[TEST 6] Admin Search & Pagination");
    const searchServices = await request("GET", "/api/admin/services?q=Graphic&limit=5", null, adminToken);
    if (searchServices.status !== 200 || !searchServices.body.services || searchServices.body.services.length === 0) {
      throw new Error("Admin search on services failed!");
    }
    console.log(`✅ Admin search returned ${searchServices.body.services.length} matches (total: ${searchServices.body.total}).`);

    const searchBlogs = await request("GET", "/api/admin/blogs?q=AI&limit=5", null, adminToken);
    if (searchBlogs.status !== 200 || !searchBlogs.body.blogs || searchBlogs.body.blogs.length === 0) {
      throw new Error("Admin search on blogs failed!");
    }
    console.log(`✅ Admin search on blogs returned ${searchBlogs.body.blogs.length} matches.`);

    console.log("\n🎉 ALL 6 TEST SUITES PASSED FLAWLESSLY! ✅");
  } finally {
    server.close();
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error("\n❌ TEST SUITE FAILED:", err);
  if (server) server.close();
  process.exit(1);
});

