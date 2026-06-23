import SectionButton from "./SectionButton";
import UserCard from "./UserCard";

import SECTIONS from "../models/sectionModel";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {

  const { nameUser, UserId } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const handleClick = (section) => {

    const rutaLimpia = section.ruta.startsWith("/")
      ? section.ruta.substring(1)
      : section.ruta;

    navigate(`/${nameUser}/${UserId}/${rutaLimpia}`);
  };

  const activeSection =
    SECTIONS.find(sec =>
      location.pathname.includes(sec.ruta)
    )?.name;

  return (
    <div className="sidebar">

      <UserCard />

      <button className="btn-new">
        <span>+</span>
        Nuevo
      </button>

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