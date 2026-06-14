import React, { useState } from 'react'
import { adminLogin, saveSession } from '../../services/api.js'

export default function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!username.trim() || !token.trim()) {
      setError('Completa todos los campos.')
      return
    }

    setLoading(true)
    try {
      const data = await adminLogin(username.trim(), token)
      saveSession(data.jwt, data.expires_at)
      onSuccess()
    } catch (err) {
      if (err.status === 429) {
        setError('Demasiados intentos, espera 15 minutos antes de intentar de nuevo.')
      } else if (err.status === 401) {
        setError('Credenciales inválidas.')
      } else {
        setError('Error al conectar con el servidor. Intenta más tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-[#0F1117] border border-[#2E3150] text-[#F0F0F5] rounded-lg px-4 py-3 text-sm placeholder:text-[#9898B0]/60 focus:outline-none focus:border-[#6C63FF] transition-colors'

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <header className="text-center mb-8">
          <p className="font-bold text-2xl text-[#F0F0F5]">
            Cach<span className="text-[#6C63FF]">Ramn</span>
          </p>
          <p className="text-[#9898B0] text-sm mt-2">Panel de administración</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1D26] border border-[#2E3150] rounded-2xl p-8 flex flex-col gap-5"
          aria-labelledby="login-heading"
        >
          <h1 id="login-heading" className="text-lg font-semibold text-[#F0F0F5] mb-1">
            Iniciar sesión
          </h1>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-username" className="text-sm font-medium text-[#F0F0F5]">
              Usuario
            </label>
            <input
              type="text"
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className={inputClass}
              placeholder="Nombre de usuario"
              aria-required="true"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="admin-token" className="text-sm font-medium text-[#F0F0F5]">
              Token de acceso
            </label>
            <input
              type="password"
              id="admin-token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="current-password"
              className={inputClass}
              placeholder="••••••••"
              aria-required="true"
            />
          </div>

          {error && (
            <div role="alert" className="flex items-start gap-3 bg-red-900/20 border border-red-700/40 rounded-lg p-3">
              <svg aria-hidden="true" focusable="false" className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C63FF] hover:bg-[#5A52E0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            aria-busy={loading}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
