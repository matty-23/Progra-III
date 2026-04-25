import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsuario.js";

export default function Login() {
  const navigate = useNavigate();
  
  // Extraemos toda la lógica de tu hook
  const {
    credentials,
    error,
    handleChangeLogin,
    handleSubmitLogin,
    isAuthenticated
  } = useUsers();

  // Este useEffect "escucha" si el usuario se autenticó con éxito.
  // Si isAuthenticated cambia a true, hacemos la navegación.
  useEffect(() => {
    if (isAuthenticated) {
      const nameUser = "maira";
      const UserId = 123;
      navigate(`/${nameUser}/${UserId}`);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Iniciar Sesión</h2>
      
      {/* El formulario ejecuta la validación real de tu hook */}
      <form onSubmit={handleSubmitLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
        
        {/* Mostramos el error si las credenciales son incorrectas */}
        {error && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChangeLogin}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChangeLogin}
            required
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
      
      {/* Recordatorio de tus credenciales quemadas en el código */}
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <em>Datos de prueba: admin@correo.com / 123</em>
      </p>
    </div>
  );
}