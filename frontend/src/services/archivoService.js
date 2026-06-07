const API_URL = import.meta.env.VITE_API_URL;

export const archivoService = {
  async obtenerCarpetasPrincipales(idUsuario) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/carpetas/carpetas-principales/${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
};