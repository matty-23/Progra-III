import SectionButton from "./SectionButton";
import SECTIONS from "../models/sectionModel";

export default function Sidebar({sections}) {
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
        <SectionButton section={SECTIONS[0]} isActive={true} onClick={() => {}} />
        <SectionButton section={SECTIONS[2]} isActive={false} onClick={() => {}} />
        <SectionButton section={SECTIONS[1]} isActive={false} onClick={() => {}} />
        <SectionButton section={SECTIONS[3]} isActive={false} onClick={() => {}} />
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