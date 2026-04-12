import "./Route.css";     
export default function Route({ path }) {
  if (!path || path === "/") {
    return (
      <nav className="route-breadcrumb">
        <span style={{ color: '#6b7280' }}>📁 Inicio</span>
      </nav>
    );
  }

  const segments = path.split("/").filter(Boolean);

  return (
    <nav className="route-breadcrumb">
      <span className="breadcrumb-segment" style={{ color: '#6b7280' }}>📁 Inicio</span>
      
      {segments.map((seg, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ color: '#9ca3af' }}>/</span>
          <span className="breadcrumb-segment">{seg}</span>
        </span>
      ))}
    </nav>
  );
}