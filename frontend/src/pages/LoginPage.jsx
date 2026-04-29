import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsuario.js";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  
  const {
    credentials,
    error,
    handleChangeLogin,
    handleSubmitLogin,
    isAuthenticated
  } = useUsers();

  useEffect(() => {
    if (isAuthenticated) {
      const nameUser = "maira";
      const UserId = 123;
      navigate(`/${nameUser}/${UserId}/mi-area`);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmitLogin} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChangeLogin}
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChangeLogin}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Ingresar
          </button>
        </form>
        
        <p className="login-hint">
          <em>Datos de prueba: admin@correo.com / 123</em>
        </p>
      </div>
    </div>
  );
}