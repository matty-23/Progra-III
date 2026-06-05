import { useState } from 'react';
import { authApiService } from "../domain/authService.js";

export const useUsers = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [view, setView] = useState('login');
  const [error, setError] = useState('');

  // LOGIN
  const [credentials, setCredentials] = useState({
    email: '', // Lo usaremos como 'username' para el BFF
    password: ''
  });

  // REGISTER (Adaptado a lo que pide RegisterRequest en auth.proto)
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSuccess = (token, userData) => {
  localStorage.setItem('token', token);
  setLoggedUser(userData);
  setIsAuthenticated(true);
  setError('');
};

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await authApiService.logout(token);
      } catch (e) {
        console.error("Error en el logout del servidor", e);
      }
    }
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleSubmitLogin = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const data = await authApiService.login(credentials.email, credentials.password);
    
    if (data.accessToken) {
      // Pasamos el username y el idUsuario devueltos por el backend
      handleLoginSuccess(data.accessToken, { 
        username: data.username, 
        idUsuario: data.idUsuario 
      });
    }
  } catch (err) {
    setError('Credenciales incorrectas o servidor no disponible');
  }
};
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
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
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (err) {
      setError('Error al registrar. Verifica los datos.');
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