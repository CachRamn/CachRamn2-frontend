import React from 'react'
import { T, Eyebrow, Reveal } from './_ui.jsx'

const servicios = [
  {
    title: 'Landing Page Estática',
    description:
      'Una página de alto impacto diseñada para convertir visitantes en prospectos. Carga ultrarrápida, optimizada para SEO y adaptada a cualquier dispositivo. Ideal para lanzamientos, campañas o presentar un servicio específico.',
    tags: ['Alta conversión', 'SEO', 'Mobile-first'],
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="8 21 12 17 16 21" />
      </>
    ),
  },
  {
    title: 'Sitio Web Estático',
    description:
      'Presencia digital completa con múltiples secciones: inicio, servicios, portafolio, contacto. Arquitectura estática para máxima velocidad y mínimo costo de mantenimiento, sin depender de servidores costosos.',
    tags: ['Multipage', 'Rápido', 'Bajo mantenimiento'],
    icon: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: 'Sitio / Landing con API Integrada',
    description:
      'Cuando tu negocio necesita más: formularios inteligentes, automatizaciones de WhatsApp, integraciones de pago, paneles de administración o cualquier lógica de servidor personalizada. La solución completa.',
    tags: ['APIs a medida', 'Automatización', 'Panel admin'],
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 15.54a5 5 0 0 1 0-7.07" />
      </>
    ),
  },
]

export default function Servicios() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 28px 40px' }}
    >
      <Reveal style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
        <Eyebrow>// LO QUE HACEMOS</Eyebrow>
        <h2
          id="servicios-heading"
          style={{
            fontFamily: T.display,
            fontSize: 'clamp(32px, 4.5vw, 44px)',
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: '-.03em',
            margin: '0 0 16px',
          }}
        >
          Cada proyecto, construido desde cero para tu negocio
        </h2>
        <p style={{ fontSize: '17px', color: T.muted, margin: 0, lineHeight: 1.6, textWrap: 'pretty' }}>
          Desde tu primera página hasta una plataforma con APIs a medida. Construimos rápido, con
          tecnología moderna y pensado para vender.
        </p>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px',
        }}
      >
        {servicios.map((s) => (
          <Reveal
            key={s.title}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34,224,122,.4)'
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.background = 'rgba(34,224,122,.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.background = T.surface
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '28px 26px',
              borderRadius: '18px',
              background: T.surface,
              border: `1px solid ${T.border}`,
              transition: 'transform .25s, border-color .25s, background .25s',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '13px',
                background: 'rgba(34,224,122,.1)',
                display: 'grid',
                placeItems: 'center',
                marginBottom: '20px',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={T.green}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {s.icon}
              </svg>
            </div>
            <h3
              style={{
                fontFamily: T.display,
                fontSize: '19px',
                fontWeight: 600,
                margin: '0 0 9px',
                letterSpacing: '-.01em',
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: '14.5px', color: T.muted, lineHeight: 1.55, margin: '0 0 18px' }}>
              {s.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '5px 11px',
                    borderRadius: '999px',
                    background: 'rgba(34,224,122,.08)',
                    color: '#7fcfa0',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
