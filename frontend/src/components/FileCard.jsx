import './FileCard.css';

const FolderIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="#fbbc04" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6H12L10 4Z" />
  </svg>
);

const DocIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="#4285f4" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM13 9V3.5L18.5 9H13Z" />
  </svg>
);

export default function FileCard({ file, onClick, onEdit, onDelete }) {
  // Normalizamos el tipo a minúsculas para evitar errores
  const rawType = file.tipo ?? file.type ?? "folder";
  const tipo = String(rawType).toLowerCase();
  
  const nombre = file.nombre ?? file.name ?? "Sin nombre";
  const isDoc = tipo === "document" || tipo === "documento";

  return (
    <div className="card" onClick={() => onClick(file)}>
      <div className={isDoc ? "preview" : "folder-preview"}>
        {isDoc ? <DocIcon /> : <FolderIcon />}
      </div>
      
      <div className="info file-card-info">
        <p className="title file-card-title">{nombre}</p>
        
        <div className="file-card-actions">
          <button className="btn-card-action" onClick={(e) => { e.stopPropagation(); onEdit(file); }} title="Editar">✏️</button>
          <button className="btn-card-action" onClick={(e) => { e.stopPropagation(); onDelete(file); }} title="Eliminar">🗑️</button>
        </div>
      </div>
    </div>
  );
}