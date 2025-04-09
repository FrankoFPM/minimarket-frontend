import React, { useState } from 'react'
import { Link } from 'react-router'
import '../../styles/loginAndRegister.css'

const Register = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nombre || !email || !password || !confirmarPassword) {
      setError('Por favor, completa todos los campos')
      return
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    alert('Registro exitoso')

    setNombre('')
    setEmail('')
    setPassword('')
    setConfirmarPassword('')
    setError('')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="title">MINIMARKET</h1>

        <div className="logo-container">
          <img src="/logoM.png" alt="Logo Minimarket" className="logo" />
        </div>

        <h2 className="subtitle">Registrarse</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="user-icon">👤</i>
            </div>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="input-field"
            />
          </div>

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

          <div className="input-group">
            <div className="input-icon">
              <i className="password-icon">🔒</i>
            </div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button type="submit" className="submit-button">Registrarse</button>
        </form>

        <div className="auth-switch">
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
