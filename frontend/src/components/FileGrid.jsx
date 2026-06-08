import FileCard from "./FileCard";
import "./FileGrid.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function FileGrid({ data, onEdit, onDelete }) { 
  const navigate = useNavigate();
  const location = useLocation();

  // Leemos directamente de las props sin useState ni useEffect
  const files = data?.children || [];

  const handleClick = (file) => {
    const tipo   = file.tipo  ?? file.type ?? "folder";
    const nombre = file.nombre ?? file.name;

    if (tipo === "folder" || tipo === "carpeta") {
      const segmento = file.id ?? nombre;
      const newPath = `${location.pathname}/${segmento}`.replace("//", "/");
      navigate(newPath);
    }

    if (tipo === "document" || tipo === "documento") {
      const docId = file.id ?? file.documentId;
      window.open(`/document/${docId}`, "_blank");
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