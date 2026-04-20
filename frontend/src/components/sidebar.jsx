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
      <div className="sidebar-header">
        <div className="sidebar-logo"></div> {/* Icono simulado */}
        <div>
            <div>Tu espacio de trabajo</div>
        </div>
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
    
    </div>
  );
}