// src/pages/RegisterPage.jsx
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsuario.js";
import RegisterForm from "../components/RegisterForm.jsx";
import '../styles/Register.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const {user,error,handleChangeRegister,handleSubmitRegister} = useUsers();

  const handleRegister = async (e) => {
    const registroExitoso = await handleSubmitRegister(e);
    if (registroExitoso) navigate("/"); 
};

  const handleGoToLogin = () => {
    navigate("/");
  };

  return (
    <div className="register-wrapper">
      <RegisterForm user={user} error={error} onChange={handleChangeRegister}onSubmit={handleRegister} onGoToLogin={handleGoToLogin}/>
    </div>
  );
}