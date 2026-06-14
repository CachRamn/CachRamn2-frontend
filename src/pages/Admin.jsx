import React, { useState, useEffect } from 'react'
import { isAuthenticated, clearSession } from '../services/api.js'
import LoginForm from '../components/admin/LoginForm.jsx'
import MessagesTab from '../components/admin/MessagesTab.jsx'
import ResponsesTab from '../components/admin/ResponsesTab.jsx'

const TABS = [
  { id: 'messages', label: 'Mensajes' },
  { id: 'responses', label: 'Respuestas precargadas' },
]

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [activeTab, setActiveTab] = useState('messages')

  useEffect(() => {
    setAuthed(isAuthenticated())
  }, [])

  function handleAuthSuccess() {
    setAuthed(true)
  }

  function handleAuthError() {
    clearSession()
    setAuthed(false)
  }

  function handleLogout() {
    clearSession()
    setAuthed(false)
  }

  if (!authed) {
    return <LoginForm onSuccess={handleAuthSuccess} />
  }

  return (
    <div className="min-h-screen bg-[#0F1117]">
      {/* Admin top bar */}
      <header className="bg-[#1A1D26] border-b border-[#2E3150] px-4 sm:px-6 h-14 flex items-center justify-between">
        <p className="font-semibold text-[#F0F0F5]">
          Cach<span className="text-[#6C63FF]">Ramn</span>{' '}
          <span className="text-[#9898B0] font-normal text-sm">Admin</span>
        </p>
        <button
          onClick={handleLogout}
          className="text-sm text-[#9898B0] hover:text-[#F0F0F5] transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab nav */}
        <nav aria-label="Secciones del panel" className="flex gap-1 mb-8 border-b border-[#2E3150]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-[#6C63FF] border-[#6C63FF]'
                  : 'text-[#9898B0] border-transparent hover:text-[#F0F0F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab panels */}
        <div role="tabpanel" aria-label={TABS.find((t) => t.id === activeTab)?.label}>
          {activeTab === 'messages' && (
            <MessagesTab onAuthError={handleAuthError} />
          )}
          {activeTab === 'responses' && (
            <ResponsesTab onAuthError={handleAuthError} />
          )}
        </div>
      </div>
    </div>
  )
}
