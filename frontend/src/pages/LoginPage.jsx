import React from 'react';

const Login = ({
  credentials,
  error,
  handleChangeLogin,
  handleSubmitLogin,
  setView
}) => {
  return (
    <div>
      <form onSubmit={handleSubmitLogin}>
        
        {error && <div>{error}</div>}

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChangeLogin}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChangeLogin}
          />
        </div>

        <button type="submit">
          Login
        </button>

        <button
          type="button"
          onClick={() => setView('register')}
        >
          Ir a registro
        </button>

      </form>
    </div>
  );
};

export default Login;