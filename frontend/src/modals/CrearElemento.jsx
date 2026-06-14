import { useState } from 'react';
import './crearElemento.css';

export default function CrearElemento({ isOpen, onClose, onCreate }) {
  const [tipo, setTipo] = useState('carpeta'); 
  const [nombre, setNombre] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() !== "") {
      onCreate(tipo, nombre);
      setNombre('');
      setTipo('carpeta');
    }
  };

  const handleClose = () => {
    setNombre('');
    onClose();
};

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Crear nuevo elemento</h3>
        
        <div className="tipo-selector">
          <button 
            type="button" 
            className={tipo === 'carpeta' ? 'active' : ''} 
            onClick={() => setTipo('carpeta')}>
            📁 Carpeta
          </button>
          <button 
            type="button" 
            className={tipo === 'documento' ? 'active' : ''} 
            onClick={() => setTipo('documento')}
          >
            📄 Documento
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            autoFocus
            type="text" 
            placeholder={`Nombre de la ${tipo}`} 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={handleClose}>Cancelar</button>
            <button type="submit" className="btn-confirm">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}