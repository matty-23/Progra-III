import { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from "react-router-dom";
import localforage from 'localforage';
import { archivoService } from '../services/archivoService.js';
import { useAutoSave } from '../hooks/useAutoSave.js'; 
import './ReadMe.css';

export default function ReadMe({ carpetaId, nombreCarpeta }) {
  const { pathname } = useLocation();
  const { UserId } = useParams();
  const [text, setText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    localforage.getItem(`readme-${pathname}`).then(saved => {
      setText(saved || "");
      setIsLoaded(true);
    });
  }, [pathname]);

  const guardarEnServidor = useCallback(async (textoParaGuardar) => {
    if (!isLoaded) return;
    await localforage.setItem(`readme-${pathname}`, textoParaGuardar);

    if (carpetaId && nombreCarpeta) {
      try {
        await archivoService.actualizarCarpeta(carpetaId, nombreCarpeta, UserId, textoParaGuardar);
      } catch (error) {
        console.error("Error guardando readme en BFF:", error);
        throw error; 
      }
    }
  }, [isLoaded, pathname, carpetaId, nombreCarpeta, UserId]);

  const estadoGuardado = useAutoSave(text, guardarEnServidor, 2000);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="readme-container">
        <h2 className='title-readme'>README</h2>
      <p>
        <textarea
          className="readme-input"
          id="readme-input"
          value={text}
          onChange={handleChange}
        />
      </p>
    </div>
  );
}