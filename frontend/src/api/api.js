const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authFetch = (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (r) => {
    if (r.status === 401) {
      // Clear local session if token is rejected by backend
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.dispatchEvent(new Event("auth:logout"));
      const err = await r.json().catch(() => ({ message: "Unauthorized" }));
      throw err;
    }
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw err;
    }
    return r.json();
  });

// ==========================================
// Public APIs
// ==========================================
export const fetchClients = () => fetch(`${API}/clients`).then((r) => r.json());

export const fetchServices = () =>
  fetch(`${API}/services`).then((r) => r.json());

export const fetchService = (slug) =>
  fetch(`${API}/services/${slug}`).then((r) => {
    if (!r.ok) throw new Error("Service not found");
    return r.json();
  });

export const fetchBlogs = () => fetch(`${API}/blogs`).then((r) => r.json());

export const fetchBlog = (slug) =>
  fetch(`${API}/blogs/${slug}`).then((r) => {
    if (!r.ok) throw new Error("Blog not found");
    return r.json();
  });

export const fetchTeam = () => fetch(`${API}/team`).then((r) => r.json());

// ==========================================
// Admin Services APIs
// ==========================================
export const fetchAdminServices = ({ q = "", status = "", page = 1, limit = 10 } = {}) => {
  const query = new URLSearchParams();
  if (q) query.append("q", q);
  if (status) query.append("status", status);
  if (page) query.append("page", page);
  if (limit) query.append("limit", limit);
  return authFetch(`${API}/admin/services?${query.toString()}`);
};

export const fetchAdminService = (id) =>
  authFetch(`${API}/admin/services/${id}`);

export const createService = (formData) =>
  authFetch(`${API}/admin/services`, {
    method: "POST",
    body: formData,
  });

export const updateService = (id, formData) =>
  authFetch(`${API}/admin/services/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteService = (id) =>
  authFetch(`${API}/admin/services/${id}`, {
    method: "DELETE",
  });

// ==========================================
// Admin Blogs APIs
// ==========================================
export const fetchAdminBlogs = ({ q = "", status = "", page = 1, limit = 10 } = {}) => {
  const query = new URLSearchParams();
  if (q) query.append("q", q);
  if (status) query.append("status", status);
  if (page) query.append("page", page);
  if (limit) query.append("limit", limit);
  return authFetch(`${API}/admin/blogs?${query.toString()}`);
};

export const fetchAdminBlog = (id) =>
  authFetch(`${API}/admin/blogs/${id}`);

export const createBlog = (formData) =>
  authFetch(`${API}/admin/blogs`, {
    method: "POST",
    body: formData,
  });

export const updateBlog = (id, formData) =>
  authFetch(`${API}/admin/blogs/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteBlog = (id) =>
  authFetch(`${API}/admin/blogs/${id}`, {
    method: "DELETE",
  });

// ==========================================
// Team & Clients APIs
// ==========================================
export const createTeam = (data) =>
  authFetch(`${API}/team`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateTeam = (id, data) =>
  authFetch(`${API}/team/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteTeam = (id) =>
  authFetch(`${API}/team/${id}`, {
    method: "DELETE",
  });

export const createClient = (formData) =>
  authFetch(`${API}/clients`, {
    method: "POST",
    body: formData,
  });

export const updateClient = (id, formData) =>
  authFetch(`${API}/clients/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteClient = (id) =>
  authFetch(`${API}/clients/${id}`, {
    method: "DELETE",
  });

// ==========================================
// Authentication
// ==========================================
export const login = (data) =>
  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (r) => {
    const res = await r.json().catch(() => ({}));
    if (!r.ok) {
      throw new Error(res.message || "Invalid credentials");
    }
    return res;
  });

export const fetchMe = () => authFetch(`${API}/auth/me`);

export const logoutApi = () =>
  fetch(`${API}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((r) => r.json())
    .catch(() => ({}));
