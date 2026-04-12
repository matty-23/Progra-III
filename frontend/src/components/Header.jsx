export default function Header() {
  return (
    <div className="header">
      <div className="search-bar">
        <span>🔍</span>
        <input placeholder="Buscar archivos y carpetas..." />
      </div>

      <div className="header-right">
        <div className="user-profile">
            <div className="avatar">ML</div>
            <span>María L.</span>
        </div>
      </div>
    </div>
  );
}