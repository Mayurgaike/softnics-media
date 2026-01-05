const API = import.meta.env.VITE_API_URL;

const authFetch = (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then(async (r) => {
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw err;
    }
    return r.json();
  });

// Public API's
export const fetchClients = () =>
  fetch(`${API}/clients`).then((r) => r.json());

export const fetchServices = () =>
  fetch(`${API}/services`).then((r) => r.json());

export const fetchService = (slug) =>
  fetch(`${API}/services/${slug}`).then((r) => r.json());

export const fetchBlogs = () =>
  fetch(`${API}/blogs`).then((r) => r.json());

export const fetchBlog = (slug) =>
  fetch(`${API}/blogs/${slug}`).then((r) => r.json());

export const fetchTeam = () =>
  fetch(`${API}/team`).then((r) => r.json());

// Protected API's

export const createBlog = (formData) =>
  authFetch(`${API}/blogs`, {
    method: "POST",
    body: formData,
  });

export const updateBlog = (id, formData) =>
  authFetch(`${API}/blogs/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteBlog = (id) =>
  authFetch(`${API}/blogs/${id}`, {
    method: "DELETE",
  });

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

export const createService = (formData) =>
  authFetch(`${API}/services`, {
    method: "POST",
    body: formData,
  });

export const updateService = (id, formData) =>
  authFetch(`${API}/services/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteService = (id) =>
  authFetch(`${API}/services/${id}`, {
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

// Login 

export const login = (data) =>
  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());
