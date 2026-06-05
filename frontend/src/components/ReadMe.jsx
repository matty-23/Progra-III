import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import localforage from 'localforage';
import './ReadMe.css';

export default function ReadMe() {
  const { pathname } = useLocation();
  const [text, setText] = useState("");
  const [content, setContent] = useState("");

  // Cargar contenido general
  useEffect(() => {
    localforage.getItem('readme-content').then(saved => {
      setContent(saved || '');
    });
  }, []);

  // Cargar texto específico de la ruta
  useEffect(() => {
    localforage.getItem(`readme-${pathname}`).then(saved => {
      setText(saved || "");
    });
  }, [pathname]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    localforage.setItem('readme-content', newText);
  };

  // Guardar texto específico de la ruta
  useEffect(() => {
    // Evitamos guardar cadenas vacías en la primera renderización si aún no cargó
    if (text !== "") {
      localforage.setItem(`readme-${pathname}`, text);
    }
  }, [text, pathname]);

  return (
    <div className="readme-container">
      <h2 className='title-readme'>README</h2>
      <p>
      <textarea
        className="readme-input"
        id="readme-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      </p>
    </div>
  );
}