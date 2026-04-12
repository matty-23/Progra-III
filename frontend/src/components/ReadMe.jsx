import { useState } from 'react';
import './ReadMe.css';

export default function ReadMe() {
  // Cargar contenido guardado o iniciar vacío
  const [content, setContent] = useState(() => 
    localStorage.getItem('readme-content') || ''
  );

  // Actualizar estado y guardar en localStorage en cada tecla
  const handleChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    localStorage.setItem('readme-content', newText);
  };

  return (
    <div className="readme-container">
      <h2 className='title-readme'>README</h2>
      
      <p>
      <textarea
        className="readme-input"
        value={content}
        onChange={handleChange}
      />
        </p>
    </div>
  );
}