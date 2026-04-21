import React from 'react';
import { useRegister } from '../hooks/useUsuario';

const RegisterForm = ({  user,
  error,
  handleChangeRegister,
  handleSubmitRegister,
  onGoToLogin }) => {

  return (
    <div className="register-container">
      <div className="card shadow register-card">
        <h2 className="register-title">Registro</h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger register-error">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              required
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success register-button"
          >
            Registrarse
          </button>

          <p className="register-footer">
            ¿Ya tienes cuenta?
            <button
              type="button"
              className="btn btn-link p-0 ms-1"
              onClick={onGoToLogin}
            >
              Inicia Sesión
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;