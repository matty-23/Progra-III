import { useState } from 'react';

export const useUsers = () => {

  // USERS
  const [users, setUsers] = useState([
    { id: 1, name: 'Tania', username: 'floppydiskette' }
  ]);

  // AUTH
  const [whiteList, setWhiteList] = useState([
    { email: 'admin@correo.com', password: '123' }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('login');

  // LOGIN
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // REGISTER
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  // CRUD STATE
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: '',
    username: ''
  });

  // =====================
  // AUTH LOGIC
  // =====================

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    const validUser = whiteList.find(
      (u) =>
        u.email === credentials.email &&
        u.password === credentials.password
    );

    if (validUser) {
      setError('');
      handleLogin();
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setWhiteList([...whiteList, {
      email: user.email,
      password: user.password
    }]);

    setError('');
    setView('login');
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

  // =====================
  // CRUD
  // =====================

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map((u) => (u.id === id ? updatedUser : u)));
    setEditing(false);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  return {
    users,
    editing,
    currentUser,
    whiteList,
    view,
    isAuthenticated,

    setView,
    setEditing,
    setCurrentUser,

    credentials,
    user,
    error,

    handleLogin,
    handleLogout,
    handleSubmitLogin,
    handleSubmitRegister,
    handleChangeLogin,
    handleChangeRegister,

    addUser,
    deleteUser,
    updateUser,
    editRow
  };
};