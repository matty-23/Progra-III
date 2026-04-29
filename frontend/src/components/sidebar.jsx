import SectionButton from "./SectionButton";
import SECTIONS from "../models/sectionModel";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
  const { nameUser, UserId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 1. Obtenemos la URL actual

  const handleClick = (section) => {
    // Limpiamos la barra inicial por si la ruta del modelo ya la trae (ej: "/recientes")
    const rutaLimpia = section.ruta.startsWith('/') 
      ? section.ruta.substring(1) 
      : section.ruta;
      
    navigate(`/${nameUser}/${UserId}/${rutaLimpia}`);
  };

  // 2. Buscamos qué sección coincide con la URL actual
  const activeSection = SECTIONS.find(sec => location.pathname.includes(sec.ruta))?.name;

  return (
    <div className="sidebar">
      {/* TARJETA DE PERFIL Y ACCIÓN */}
      <div className="sidebar-card">
        <div className="profile-section">
          <div className="avatar-circle">MT</div>
          <div className="profile-info">
            <span className="profile-name">Maira</span>
            <span className="profile-type">Personal</span>
          </div>
        </div>
        
        <button className="btn-new">
          <span>+</span> Nuevo
        </button>
      </div>

      <nav>
        {SECTIONS.map((section) => (
          <SectionButton
            key={section.name}
            section={section}
            // 3. Comparamos directamente con el nombre de la sección encontrada
            isActive={activeSection === section.name}
            onClick={() => handleClick(section)}
          />
        ))}
      </nav>
      
      <div className="sidebar-footer">
      </div>
    </div>
  );
}