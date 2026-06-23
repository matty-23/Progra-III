import { useNavigate } from "react-router-dom";
import { authApiService } from "../services/authService";
import { useAuthUser } from "../hooks/useAuthUser";

import "./UserCard.css";

export default function UserCard() {
  const navigate = useNavigate();

  const { user, handleLogout } = useAuthUser();

  const onLogoutClick = async () => {
    try {
      await handleLogout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  const initials =
    user?.username
      ?.split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "?";

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="avatar-circle">
          {initials}
        </div>
        <div className="user-info">
          <span className="user-name">
            {user?.username || "Usuario"}
          </span>
          <span className="user-role">
            Personal
          </span>
        </div>
      </div>

      <button
        className="logout-button"
        onClick={onLogoutClick}
      >
        Cerrar sesión
      </button>
    </div>
  );
}