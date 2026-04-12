export default function SectionButton({section, isActive, onClick}) {
  return (
    <p className={isActive ? 'active' : ''} onClick={onClick}>
      {section.icon} {section.name}
    </p>
  );
}