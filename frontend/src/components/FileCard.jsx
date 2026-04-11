import './FileCard.css';
export default function FileCard({ file, onClick }) {

  return (
    <div className="card" onClick={() => onClick(file)}>
      
      {file.type === "document" ? (
        <>
          <div className="preview">
            <img src="/previews/doc.png" alt="" />
          </div>

          <div className="info">
            <p className="title">{file.name}</p>
            <span className="meta">Abierto recientemente</span>
          </div>
        </>
      ) : (
        <>
          <div className="folder-preview">
            <img src="/icons/carpeta.png" alt="" />
          </div>

          <div className="info">
            <p className="title">{file.name}</p>
          </div>
        </>
      )}

    </div>
  );
}