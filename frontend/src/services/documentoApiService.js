// src/services/documentoApiService.js
const BASE = import.meta.env.VITE_BFF_URL;

async function request(path, options = {}) {
  const token = localStorage.getItem('token'); // Recuperamos el token por seguridad
  
  const res = await fetch(`${BASE}${path}`, {
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const documentoApiService = {
  getById: (id)  => request(`/documentos/${id}`),

  create:  (idCarpeta, nombre, idUsuario) => request(`/documentos/${idCarpeta}`, { 
      method: 'POST', 
      body: JSON.stringify({ nombre, idUsuario }) 
  }),

  update:  (doc) => {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
      
      return request(`/documentos/${doc.id}`, { 
          method: 'PUT',  
          body: JSON.stringify({
              nombre: doc.title || "Sin título",
              idUsuario: loggedUser.idUsuario,
              contenido: JSON.stringify(doc.blocks) 
          }) 
      });
  },
  
  eliminar: (id, idUsuario) => request(`/documentos/${id}/usuario/${idUsuario}`, {
      method: 'DELETE'
  })
};