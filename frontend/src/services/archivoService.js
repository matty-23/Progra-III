const API_URL = import.meta.env.VITE_API_URL;

export const archivoService = {
  async obtenerCarpetasPrincipales(idUsuario) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/carpetas-principales/${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache' 
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener carpetas principales: ${response.status}`);
    }

    return response.json();
  },

  async obtenerContenidoCarpeta(idCarpeta) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/contenido/${idCarpeta}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener contenido de carpeta: ${response.status}`);
    }

    return response.json();
  },

  async obtenerCarpeta(idCarpeta) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/${idCarpeta}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache' 
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener carpeta: ${response.status}`);
    }

    return response.json();
  },
  
  async crearCarpeta(idPadre, nombre, idUsuario) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/${idPadre}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, idUsuario }),
    });

    if (!response.ok) {
      throw new Error(`Error al crear la carpeta: ${response.status}`);
    }

    return response.json();
  },

  async actualizarCarpeta(idCarpeta, nombre, idUsuario, readme) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/${idCarpeta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, idUsuario, readme }),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la carpeta: ${response.status}`);
    }

    return response.json();
  },

  async eliminarCarpeta(idCarpeta, idUsuario) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/${idCarpeta}/usuario/${idUsuario}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la carpeta: ${response.status}`);
    }

    return response.json();
  },
};