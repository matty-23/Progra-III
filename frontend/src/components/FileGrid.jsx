import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import "./FileGrid.css";

export default function FileGrid({ data, 
  currentPath = "/", 
  onPathUpdate}) {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (data?.children) {
      setFiles(data.children);
    }
  }, [data]);
  
  const [history, setHistory] = useState([]);


  const handleClick = (file) => {
    if (file.type === "folder") {
      setHistory(prev => [...prev, { 
        files: files, 
        path: currentPath 
      }]);
      
      // Navegar a los hijos
      setFiles(file.children || []);
      
      // 👇 CAMBIO 3: Calcular y notificar nueva ruta
      const newPath = `${currentPath}/${file.name}`.replace("//", "/");
      if (onPathUpdate) onPathUpdate(newPath);
    }

    if (file.type === "document") {
      // 📄 abrir documento
      const docsData = JSON.parse(localStorage.getItem("documents"));

      const doc = docsData.documents.find(
        (d) => d.id === file.documentId
      );

      console.log("Documento abierto:", doc);
    }
  };
const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      
      // Restaurar estado anterior
      setFiles(prev.files);
      setHistory(prevHistory => prevHistory.slice(0, -1));
      
      // 👇 Notificar la ruta anterior a App
      if (onPathUpdate) onPathUpdate(prev.path);
    }
  };

  return (
    <div className="grid-container">
      {/* 👇 CAMBIO 5: Botón de atrás condicional */}
      {history.length > 0 && (
        <button 
          className="btn-back" 
          onClick={handleBack}
          style={{ 
            marginBottom: '1rem', 
            background: 'none', 
            border: 'none', 
            color: '#3b82f6', 
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          ← Atrás
        </button>
      )}

    <div className="grid">
      {files.map((file, i) => (
        <FileCard key={i} file={file} onClick={handleClick} />
      ))}
    </div>
    </div>
  );
}