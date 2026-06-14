import React from 'react'
import { T } from './_ui.jsx'

const nav = [
  { label: 'Servicios', id: 'servicios' },
  { label: 'Portafolio', id: 'portafolio' },
  { label: 'Precios', id: 'precios' },
  { label: 'Contacto', id: 'contacto' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  const colTitle = {
    fontFamily: T.display,
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '16px',
    color: T.text,
  }
  const linkBtn = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    color: T.muted,
    fontSize: '14px',
    fontFamily: T.body,
    textAlign: 'left',
  }

  return (
    <footer role="contentinfo" style={{ borderTop: '1px solid rgba(255,255,255,.07)', marginTop: '40px' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '56px 28px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
        }}
      >
        <div>
          <button
            type="button"
            onClick={() => scrollTo('inicio')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: T.text,
              marginBottom: '16px',
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
              }}
            >
              <span style={{ fontFamily: T.mono, fontWeight: 700, fontSize: '17px', color: T.ink }}>
                &lt;/&gt;
              </span>
            </span>
            <span style={{ fontFamily: T.display, fontWeight: 700, fontSize: '19px' }}>CachRamn</span>
          </button>
          <p style={{ fontSize: '14.5px', color: T.faint, lineHeight: 1.6, maxWidth: '300px', margin: 0 }}>
            Desarrollo web a la medida, con APIs personalizadas, para negocios que quieren crecer en
            internet.
          </p>
        </div>

        <div>
          <div style={colTitle}>Navegación</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {nav.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => scrollTo(l.id)}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.green)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
                style={linkBtn}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={colTitle}>Contacto</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', fontSize: '14px', color: T.muted }}>
            <span>Respuesta el mismo día</span>
            <span>Por WhatsApp</span>
            <span>México</span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '22px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '13px',
            color: '#6f8579',
            fontFamily: T.mono,
          }}
        >
          <span>© {year} CachRamn · Hecho con &lt;/&gt; en México</span>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  )
}
