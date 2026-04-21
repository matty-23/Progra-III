import React from 'react';
import { useLogin } from '../hooks/useUsuario';

const LoginForm = ({   credentials,
  error,
  handleChangeLogin,
  handleSubmitLogin,
  onGoToRegister }) => {
  return (
    <div className="login-container">
      <div className="card shadow login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger login-error">
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
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary login-button">
            Ingresar
          </button>

          <p className="login-register">
            ¿No tienes cuenta?
            <button
              type="button"
              className="btn btn-link p-0 ms-1"
              onClick={onGoToRegister}
            >
              Regístrate aquí
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;