import FileCard from "./FileCard";
import "./FileGrid.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function FileGrid({ data, onEdit, onDelete }) { 
  const navigate = useNavigate();
  const location = useLocation();

  const files = data?.children || [];

  const handleClick = (file) => {
    // Normalizamos el tipo a minúsculas
    const rawType = file.tipo ?? file.type ?? "folder";
    const tipo = String(rawType).toLowerCase();
    
    const nombre = file.nombre ?? file.name;

    if (tipo === "folder" || tipo === "carpeta") {
      const segmento = file.id ?? nombre;
      const newPath = `${location.pathname}/${segmento}`.replace("//", "/");
      navigate(newPath);
    } 
    else if (tipo === "document" || tipo === "documento") {
      const docId = file.id ?? file.documentId;
      window.open(`/document/${docId}`, "_blank");
    } 
    else {
      // Si el backend manda algo distinto, lo mostramos en consola para poder depurar
      console.warn("No se reconoció el tipo de archivo al hacer clic:", tipo, file);
    }
  };

 return (
    <div className="grid-container">
      <div className="grid">
        {files.map((file) => (
          <FileCard 
            key={file.id ?? file.nombre ?? file.name} 
            file={file} 
            onClick={handleClick} 
            onEdit={onEdit}       
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}