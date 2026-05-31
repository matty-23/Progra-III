const SidebarCard = ({ profile }) => {
  return (
    <div className="sidebar-card">
      <div className="profile-section">
        <div className="avatar-circle">
          {profile?.initials || ''}
        </div>
        <div className="profile-info">
          <span className="profile-name">{profile?.name || ''}</span>
          <span className="profile-type">{profile?.type || ''}</span>
        </div>
      </div>
      
      <button className="btn-new">
        <span>+</span> Nuevo
      </button>
    </div>
  );
};

 export default SidebarCard;