import SectionButton from "./SectionButton";

export default function Sidebar({sections={}}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo"></div> {/* Icono simulado */}
        <div>
            <div>FileSpace</div>
            <div style={{fontSize: '0.7rem', opacity: 0.7}}>Tu espacio de trabajo</div>
        </div>
      </div>

      <nav>
        <p className="active">📁 Archivo principal</p>
        <p>👥 Compartidos</p>
        <p>🕒 Recientes</p>
        <p>⭐ Destacados</p>
        <SectionButton section={{name: 'Documentos', icon: '📄'}} isActive={false} onClick={() => {}} />
      </nav>

      <div className="sidebar-footer">
        <p className="storage-label">Almacenamiento</p>
        <div className="storage-bar">
            <div className="storage-fill"></div>
        </div>
        <p style={{fontSize: '0.75rem', marginTop: '5px', color: '#6b7280'}}>4.2 GB de 10 GB usados</p>
      </div>
    </div>
  );
}