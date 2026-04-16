import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import "./FileGrid.css";
import DocumentPage from "../pages/DocumentPage.jsx";

export default function FileGrid({ data, currentPath = "/", onPathUpdate }) {

  const [files, setFiles] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (data?.children) {
      setFiles(data.children);
    }
  }, [data]);

  const handleClick = (file) => {

    // 📁 Navegación de carpetas
    if (file.type === "folder") {
      setHistory(prev => [...prev, { 
        files: files, 
        path: currentPath 
      }]);

      setFiles(file.children || []);

      const newPath = `${currentPath}/${file.name}`.replace("//", "/");
      if (onPathUpdate) onPathUpdate(newPath);
    }

    // 📄 Abrir documento
    if (file.type === "document") {
      window.open(`/document/${file.documentId}`, "_blank");
      
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];

      setFiles(prev.files);
      setHistory(prevHistory => prevHistory.slice(0, -1));

      if (onPathUpdate) onPathUpdate(prev.path);
    }
  };


  return (
    <div className="grid-container">

      {history.length > 0 && (
        <button className="btn-back" onClick={handleBack}>
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