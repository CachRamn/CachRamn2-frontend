import React from 'react'
import { T, Eyebrow, Reveal } from './_ui.jsx'

const proyectos = [
  {
    id: 1,
    titulo: 'Ferrería Durán',
    descripcion: 'Landing page con catálogo de productos y formulario de cotización integrado.',
    tipo: 'Landing Page',
  },
  {
    id: 2,
    titulo: 'Estudio Contable MV',
    descripcion: 'Sitio corporativo multipage con blog y sección de descargas de documentos.',
    tipo: 'Sitio Web',
  },
  {
    id: 3,
    titulo: 'Taquería El Güero',
    descripcion: 'Landing de pedidos con integración a WhatsApp Business para tomar órdenes.',
    tipo: 'API Integrada',
  },
  {
    id: 4,
    titulo: 'Clínica DentaPlus',
    descripcion: 'Portal de citas con sistema de recordatorios automáticos por WhatsApp y SMS.',
    tipo: 'API Integrada',
  },
  {
    id: 5,
    titulo: 'Boutique Florencia',
    descripcion: 'Catálogo digital de moda con filtros por categoría y enlace a tienda en Instagram.',
    tipo: 'Sitio Web',
  },
  {
    id: 6,
    titulo: 'Transportes Vega',
    descripcion: 'Landing de servicios logísticos con cotizador de flete en tiempo real.',
    tipo: 'API Integrada',
  },
]

// Cada tipo de proyecto tiene su gradiente y acento
const tipoTheme = {
  'Landing Page': { g: 'linear-gradient(135deg,#2a1a3d,#1c0d2b)', accent: '#A47CFF' },
  'Sitio Web': { g: 'linear-gradient(135deg,#103a3a,#0a2630)', accent: '#34D9C0' },
  'API Integrada': { g: 'linear-gradient(135deg,#1a3d2a,#0d2b1c)', accent: '#22E07A' },
}

export default function Portafolio() {
  return (
    <section
      id="portafolio"
      aria-labelledby="portafolio-heading"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '90px 28px 40px' }}
    >
      <Reveal
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '44px',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <Eyebrow>// TRABAJO RECIENTE</Eyebrow>
          <h2
            id="portafolio-heading"
            style={{
              fontFamily: T.display,
              fontSize: 'clamp(32px, 4.5vw, 44px)',
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: '-.03em',
              margin: 0,
            }}
          >
            Proyectos que reflejan a cada cliente
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '15px',
            color: T.green,
            fontWeight: 600,
            fontFamily: T.body,
            whiteSpace: 'nowrap',
          }}
        >
          Quiero algo así →
        </button>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {proyectos.map((p) => {
          const th = tipoTheme[p.tipo]
          return (
            <Reveal
              key={p.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = 'rgba(34,224,122,.35)'
                const im = e.currentTarget.querySelector('[data-img]')
                if (im) im.style.transform = 'scale(1.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.borderColor = T.border
                const im = e.currentTarget.querySelector('[data-img]')
                if (im) im.style.transform = 'scale(1)'
              }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1px solid ${T.border}`,
                background: T.surface,
                transition: 'transform .3s, border-color .3s',
                cursor: 'pointer',
              }}
            >
              <div
                data-img=""
                aria-hidden="true"
                style={{
                  position: 'relative',
                  height: '210px',
                  background: th.g,
                  display: 'grid',
                  placeItems: 'center',
                  transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '20px',
                    background: 'rgba(0,0,0,.25)',
                    backdropFilter: 'blur(4px)',
                    display: 'grid',
                    placeItems: 'center',
                    border: `1px solid ${th.accent}55`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: T.display,
                      fontWeight: 700,
                      fontSize: '26px',
                      color: th.accent,
                    }}
                  >
                    {p.titulo.charAt(0)}
                  </span>
                </div>
              </div>

              <div style={{ padding: '22px 24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '8px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: T.display,
                      fontSize: '19px',
                      fontWeight: 600,
                      margin: 0,
                      letterSpacing: '-.01em',
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: '11.5px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: `${th.accent}1a`,
                      color: th.accent,
                      border: `1px solid ${th.accent}33`,
                    }}
                  >
                    {p.tipo}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: T.muted, lineHeight: 1.55, margin: 0 }}>
                  {p.descripcion}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
