import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
export default function Login(){
    const navigate = useNavigate();

    const handleLogin = () => {
    const nameUser = "maira";
    const UserId = 123;

    navigate(`/${nameUser}/${UserId}`);
  };

  return (<div className="login-container">
      <button className="login-button" onClick={handleLogin}>Ingresar</button>
    </div>
    );
}