import { useState, useEffect } from 'react';
import './editElemento.css';

export default function EditElemento({ isOpen, onClose, onConfirm, elemento }) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (isOpen && elemento) {
      const nombreActual = elemento.nombre || elemento.name || "";
      setNombre(nombreActual);
    }
  }, [isOpen, elemento]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    onConfirm(elemento, nombre.trim());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Cambiar Nombre</h3>
          <button className="modal-close-btn" onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-group">
            <label>Nuevo Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-modal-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-modal-primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}