import { useState } from 'react';
import { authApiService } from "../services/authService.js";

export const useUsers = () => {
  const [loggedUser, setLoggedUser] = useState(() => {
    const guardado = localStorage.getItem('loggedUser');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [view, setView] = useState('login');
  const [error, setError] = useState('');


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

 const handleLoginSuccess = (token, userData) => {
  localStorage.setItem('token', token);
  localStorage.setItem('loggedUser', JSON.stringify(userData)); 
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
  localStorage.removeItem('loggedUser');
  setIsAuthenticated(false);
  setLoggedUser(null); 
};

  const handleSubmitLogin = async (e) => {
  e.preventDefault();
  setError('');
  
  try {
    const data = await authApiService.login(credentials.username, credentials.password);
    
    if (data.accessToken) {
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