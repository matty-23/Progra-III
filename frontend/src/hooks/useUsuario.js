import { useState } from 'react';
import { authApiService } from "../services/authService.js";

export const useUsers = () => {
  const [loggedUser, setLoggedUser] = useState(() => {
    const saved = localStorage.getItem('loggedUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [error, setError] = useState('');
  const [view, setView] = useState('login');

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSuccess = (accessToken, userData) => {
    localStorage.setItem('token', accessToken); // Vida corta (ej: 15 min)
    localStorage.setItem('loggedUser', JSON.stringify(userData));
    setLoggedUser(userData);
    setIsAuthenticated(true);
    setError('');
  };

  const handleLogout = async () => {
    // Llamamos a la API para invalidar en backend
    await authApiService.logout();

    // Limpiamos localmente
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    // localStorage.removeItem('refreshToken'); <-- ¡ESTO YA NO EXISTE!

    setIsAuthenticated(false);
    setLoggedUser(null);
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authApiService.login(credentials.username, credentials.password);
      if (data.accessToken) {
        handleLoginSuccess(
          data.accessToken,
          { username: data.username, idUsuario: data.idUsuario }
        );
      }
    } catch {
      setError('Credenciales incorrectas o servidor no disponible');
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    try {
      await authApiService.register({
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        username: user.username,
        password: user.password
      });

      setError('');
      setView('login');
      return true;
    } catch (err) {
      setError('Error al registrar. Verifica los datos.');
      return false;
    }
  };

  const handleChangeLogin = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeRegister = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return {
    view,
    isAuthenticated,
    setView,
    credentials,
    user,
    error,
    loggedUser,
    handleLogout,
    handleSubmitLogin,
    handleSubmitRegister,
    handleChangeLogin,
    handleChangeRegister
  };
};