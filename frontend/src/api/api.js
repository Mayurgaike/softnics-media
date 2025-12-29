const API = import.meta.env.VITE_API_URL;

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
