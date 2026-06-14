import './deleteElemento.css';

export default function DeleteElemento({ isOpen, onClose, onConfirm, elemento }) {
  if (!isOpen || !elemento) return null;

  const nombre = elemento.nombre || elemento.name || "este elemento";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>¿Confirmar eliminación?</h3>
          <button className="modal-close-btn" onClick={onClose}>✖</button>
        </div>
        <div className="modal-body">
          <p>¿Estás seguro de que deseas eliminar permanentemente <strong>{nombre}</strong>?</p>
          <span className="modal-warning-text">Esta acción no se puede deshacer.</span>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-modal-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-modal-danger" onClick={() => onConfirm(elemento)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}