import { useState, useEffect } from 'react';

export const useUserModal = (
  isOpen,
  editing,
  currentUser,
  addUser,
  updateUser,
  onClose
) => {
  const emptyUser = { id: null, name: '', username: '' };
  const [user, setUser] = useState(emptyUser);

  useEffect(() => {
    if (isOpen) {
      setUser(editing ? currentUser : emptyUser);
    }
  }, [isOpen, editing, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.username) return;

    if (editing) {
      updateUser(user.id, user);
    } else {
      addUser(user);
    }

    onClose(); // 🔥 cierre limpio
  };

  return {
    user,
    handleInputChange,
    handleSubmit
  };
};