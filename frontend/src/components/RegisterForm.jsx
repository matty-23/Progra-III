import React from 'react';
import './RegisterForm.css'; 

export default function RegisterForm({ user, error, onChange, onSubmit, onGoToLogin }) {
  return (
    <div className="register-box">
      <h2 className="register-title">Crear Cuenta</h2>

      <form onSubmit={onSubmit} className="register-form">
        {error && <div className="register-error">{error}</div>}

        <div className="input-row">
          <div className="register-input-group">
            <label>Nombre</label>
            <input type="text" name="nombre" required value={user.nombre}onChange={onChange}/>
          </div>
          <div className="register-input-group">
            <label>Apellido</label>
            <input type="text" name="apellido" required value={user.apellido} onChange={onChange}/>
          </div>
        </div>

        <div className="register-input-group">
          <label>Nombre de Usuario</label>
          <input type="text" name="username" required value={user.username} onChange={onChange}/>
        </div>

        <div className="register-input-group">
          <label>Email</label>
          <input type="email" name="email" required value={user.email} onChange={onChange}/>
        </div>

        <div className="register-input-group">
          <label>Contraseña</label>
          <input type="password" name="password" required value={user.password} onChange={onChange}/>
        </div>

        <div className="register-input-group">
          <label>Confirmar Contraseña</label>
          <input type="password" name="confirmPassword" required value={user.confirmPassword} onChange={onChange}/>
        </div>

        <button type="submit" className="btn-register">
          Registrarse
        </button>

        <p className="register-footer">
          ¿Ya tienes cuenta?
          <button type="button" className="register-link" onClick={onGoToLogin}>
            Inicia Sesión aquí
          </button>
        </p>
      </form>
    </div>
  );
}