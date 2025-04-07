import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importamos Link
import "../../styles/loginAndRegister.css";  

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    console.log('Iniciando sesión con:', { email, password });

    alert('Inicio de sesión exitoso');

    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="title">MINIMARKET</h1>

        <div className="logo-container">
          <img src="/logoM.png" alt="Logo Minimarket" className="logo" />
        </div>

        <h2 className="subtitle">Iniciar sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="email-icon">✉️</i>
            </div>
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <i className="password-icon">🔒</i>
            </div>
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">Iniciar sesión</button>
        </form>

        <div className="forgot-password">
          <a href="#" onClick={() => alert('Recuperar contraseña')}>¿Olvidaste tu contraseña?</a>
        </div>

        <div className="auth-switch">
          <p>¿No tienes una cuenta?</p>
            {}
            <Link
              to="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Registrarse
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
