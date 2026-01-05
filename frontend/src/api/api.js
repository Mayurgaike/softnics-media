const API = import.meta.env.VITE_API_URL;

export const fetchClients = () => fetch(`${API}/clients`).then((r) => r.json());

export const fetchServices = () =>
  fetch(`${API}/services`).then((r) => r.json());

export const fetchService = (slug) =>
  fetch(`${API}/services/${slug}`).then((r) => r.json());

// BLOG
export const fetchBlogs = () => fetch(`${API}/blogs`).then((r) => r.json());

export const createBlog = (fd) =>
  fetch(`${API}/blogs`, {
    method: "POST",
    body: fd,
  }).then((r) => r.json());

export const updateBlog = (id, fd) =>
  fetch(`${API}/blogs/${id}`, {
    method: "PUT",
    body: fd,
  }).then((r) => r.json());

export const deleteBlog = (id) =>
  fetch(`${API}/blogs/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());

export const fetchBlog = (slug) =>
  fetch(`${API}/blogs/${slug}`).then((r) => r.json());

export const fetchTeam = () => fetch(`${API}/team`).then((r) => r.json());

export const createTeam = (data) =>
  fetch(`${API}/team`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateTeam = (id, data) =>
  fetch(`${API}/team/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteTeam = (id) =>
  fetch(`${API}/team/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());

export const createService = (formData) =>
  fetch(`${API}/services`, {
    method: "POST",
    body: formData,
  }).then((r) => r.json());

export const updateService = (id, formData) =>
  fetch(`${API}/services/${id}`, {
    method: "PUT",
    body: formData,
  }).then((r) => r.json());

export const deleteService = (id) =>
  fetch(`${API}/services/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());

export const createClient = (formData) =>
  fetch(`${API}/clients`, {
    method: "POST",
    body: formData,
  }).then((r) => r.json());

export const updateClient = (id, formData) =>
  fetch(`${API}/clients/${id}`, {
    method: "PUT",
    body: formData,
  }).then((r) => r.json());

export const deleteClient = (id) =>
  fetch(`${API}/clients/${id}`, {
    method: "DELETE",
  }).then((r) => r.json());
