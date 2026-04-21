import React from 'react';
import { useUserModal } from '../hooks/useUserModal';

const Modal = ({
  isOpen,
  editing,
  currentUser,
  addUser,
  updateUser,
  onClose
}) => {
  const { user, handleInputChange, handleSubmit } =
    useUserModal(isOpen, editing, currentUser, addUser, updateUser, onClose);

  if (!isOpen) return null; // 🔥 clave

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3>
            {editing ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h3>
          <button onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-input">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="modal-input">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              {editing ? 'Guardar' : 'Crear'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Modal;