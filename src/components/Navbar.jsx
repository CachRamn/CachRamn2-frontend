import React, { useState, useEffect } from 'react'
import { T } from './_ui.jsx'

const links = [
  { label: 'Servicios', id: 'servicios' },
  { label: 'Portafolio', id: 'portafolio' },
  { label: 'Precios', id: 'precios' },
  { label: 'Contacto', id: 'contacto' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background .3s, border-color .3s, backdrop-filter .3s',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        background: scrolled ? 'rgba(7,16,11,.72)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid rgba(34,224,122,.10)'
          : '1px solid transparent',
      }}
    >
      <nav
        aria-label="Navegación principal"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 28px',
          height: '66px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <button
          type="button"
          onClick={() => scrollTo('inicio')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color: T.text,
          }}
        >
          <span
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 4px 16px rgba(34,224,122,.35)',
            }}
          >
            <span style={{ fontFamily: T.mono, fontWeight: 700, fontSize: '17px', color: T.ink }}>
              &lt;/&gt;
            </span>
          </span>
          <span
            style={{
              fontFamily: T.display,
              fontWeight: 700,
              fontSize: '19px',
              letterSpacing: '-.02em',
            }}
          >
            CachRamn
          </span>
        </button>

        {/* Links desktop */}
        <div
          className="cr-hide-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '34px' }}
        >
          <div style={{ display: 'flex', gap: '30px' }}>
            {links.slice(0, 3).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollTo(l.id)}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.green)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: T.muted,
                  fontSize: '14.5px',
                  fontWeight: 500,
                  fontFamily: T.body,
                  transition: 'color .2s',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollTo('contacto')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(34,224,122,.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(34,224,122,.28)'
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              background: T.green,
              color: T.ink,
              fontWeight: 700,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: T.body,
              boxShadow: '0 6px 20px rgba(34,224,122,.28)',
              transition: 'transform .2s, box-shadow .2s',
            }}
          >
            Escríbenos
          </button>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          className="cr-show-sm"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(255,255,255,.10)',
            color: T.text,
            cursor: 'pointer',
          }}
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="cr-show-sm"
          style={{
            flexDirection: 'column',
            background: 'rgba(7,16,11,.96)',
            backdropFilter: 'blur(18px)',
            borderTop: '1px solid rgba(255,255,255,.06)',
          }}
        >
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                scrollTo(l.id)
                setMenuOpen(false)
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '16px 28px',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,.04)',
                color: T.muted,
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: T.body,
                cursor: 'pointer',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
