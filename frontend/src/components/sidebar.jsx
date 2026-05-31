import SectionButton from "./SectionButton";
import SECTIONS from "../models/sectionModel";
import { useUsers } from '../hooks/useUsuario';
import SidebarCard from './SidebarCard';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
  const { nameUser, UserId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 

  const { users } = useUsers(); 
  
  const profile = users[0] ? {
    name: users[0].name,
    initials: users[0].name.substring(0, 2).toUpperCase(),
    type: 'Personal'
  } : null;

  const handleClick = (section) => {
    const rutaLimpia = section.ruta.startsWith('/') 
      ? section.ruta.substring(1) 
      : section.ruta;
      
    navigate(`/${nameUser}/${UserId}/${rutaLimpia}`);
  };

  // 2. Buscamos qué sección coincide con la URL actual
  const activeSection = SECTIONS.find(sec => location.pathname.includes(sec.ruta))?.name;

  return (
    <div className="sidebar">
      <SidebarCard profile={profile} />

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
      </div>
    </div>
  );
}