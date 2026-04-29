import SectionButton from "./SectionButton";
import SECTIONS from "../models/sectionModel";
import { useNavigate, useParams } from "react-router-dom";
import { useState} from "react";
import './Sidebar.css';

export default function Sidebar() {
  const { nameUser, UserId } = useParams();
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  const handleClick = (section) => {
    setActiveSection(section.name);
    navigate(`/${nameUser}/${UserId}/${section.ruta}`);
  };

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
            isActive={activeSection === section.name}
            onClick={() => handleClick(section)}
          />
        ))}
      </nav>
      
      <div className="sidebar-footer">
         {/* Aquí podrías poner el indicador de almacenamiento si quisieras */}
      </div>
    </div>
  );
}