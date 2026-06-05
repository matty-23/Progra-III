const API_URL = 'http://localhost:3000/api';

export const archivoService = {
  /**
   * Llama al BFF y retorna las carpetas principales del usuario.
   * Respuesta: { MiArea: [], CompartidosConmigo: [], Recientes: [], Destacados: [] }
   */
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
    // Retorna: { MiArea: [...], CompartidosConmigo: [...], Recientes: [...], Destacados: [...] }
  },

  /**
   * Obtiene el contenido (hijos) de una carpeta específica.
   */
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