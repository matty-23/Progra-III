// services/documentoApiService.js
const BASE = import.meta.env.VITE_BFF_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status; // syncService lo necesita para distinguir 4xx de 5xx
    throw err;
  }
  return res.json();
}

export const documentoApiService = {
  getById: (id)  => request(`/documents/${id}`),
  create:  (doc) => request('/documents',        { method: 'POST', body: JSON.stringify(doc) }),
  update:  (doc) => request(`/documents/${doc.id}`, { method: 'PUT',  body: JSON.stringify(doc) }),
};