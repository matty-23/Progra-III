import SectionButton from "./SectionButton";
import SECTIONS from "../models/sectionModel";

export default function Sidebar({sections}) {
  const [activeSection, setActiveSection] = useState(null);
  const handleClick = (section) => {
  setActiveSection(section.name);
  section.action();
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
        {/* <SectionButton section={SECTIONS[0]} isActive={false} onClick={() => {}} />
        <SectionButton section={SECTIONS[2]} isActive={false} onClick={() => {}} />
        <SectionButton section={SECTIONS[1]} isActive={false} onClick={() => {}} />
        <SectionButton section={SECTIONS[3]} isActive={false} onClick={() => {}} /> */}
      </nav>
    
    </div>
  );
}