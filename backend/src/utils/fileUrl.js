module.exports = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const baseUrl = (process.env.BASE_URL || "http://localhost:5000").replace(/\/$/, "");
  const cleanPath = path.startsWith("/uploads/") ? path.replace("/uploads/", "") : path.replace(/^\//, "");
  return `${baseUrl}/uploads/${cleanPath}`;
};

