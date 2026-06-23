
const getApiUrl = () => import.meta.env.VITE_API_URL;
export const authApiService = {
  async login(username, password) {
    const response = await fetch(`${getApiUrl()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include', 
    });

    if (!response.ok) throw new Error('Credenciales inválidas');
    return response.json(); 
  },

  async register(userData) {
    const response = await fetch(`${getApiUrl()}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Error al registrar usuario');
    return response.json();
  },

  async logout() {
    await fetch(`${getApiUrl()}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
    }
    ).catch(() => {
      console.warn('Error silencioso en el logout del backend');
    });
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
  },
};

