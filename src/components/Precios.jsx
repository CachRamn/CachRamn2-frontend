import React from 'react'
import WhatsAppButton from './WhatsAppButton.jsx'
import { T, Eyebrow, Reveal } from './_ui.jsx'

const planes = [
  {
    id: 'landing',
    nombre: 'Landing Page Estática',
    precio: '8,000',
    sufijo: '+ $800 / mes',
    descripcion: 'Una página de alto impacto para presentar tu producto o servicio y capturar leads.',
    features: [
      'Diseño personalizado',
      'Formulario de contacto',
      'Optimización SEO básica',
      'Versión mobile y desktop',
      'Hosting incluido en cuota mensual',
    ],
    destacado: false,
    waText: 'Hola, me interesa cotizar una Landing Page Estática con CachRamn',
  },
  {
    id: 'sitio',
    nombre: 'Sitio Web Estático',
    precio: '13,500',
    sufijo: '+ $1,200 / mes',
    descripcion: 'Presencia digital completa con múltiples páginas y una identidad coherente.',
    features: [
      'Hasta 5 secciones / páginas',
      'Blog o catálogo de servicios',
      'Formularios de contacto',
      'SEO técnico incluido',
      'Hosting y mantenimiento',
    ],
    destacado: true,
    waText: 'Hola, me interesa cotizar un Sitio Web Estático con CachRamn',
  },
  {
    id: 'api',
    nombre: 'Landing / Sitio con API',
    precio: '20,000',
    sufijo: '+ $1,800 / mes',
    descripcion: 'La solución completa cuando tu negocio necesita lógica de servidor a medida.',
    features: [
      'Todo lo del sitio estático',
      'API y backend personalizados',
      'Automatizaciones WhatsApp',
      'Panel de administración',
      'Integraciones externas',
    ],
    destacado: false,
    waText: 'Hola, me interesa cotizar un proyecto con API integrada con CachRamn',
  },
]

export default function Precios() {
  return (
    <section
      id="precios"
      aria-labelledby="precios-heading"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '90px 28px 40px' }}
    >
      <Reveal style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
        <Eyebrow>// PRECIOS CLAROS</Eyebrow>
        <h2
          id="precios-heading"
          style={{
            fontFamily: T.display,
            fontSize: 'clamp(32px, 4.5vw, 44px)',
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: '-.03em',
            margin: '0 0 16px',
          }}
        >
          Precios base sin letras chiquitas
        </h2>
        <p style={{ fontSize: '17px', color: T.muted, margin: 0, lineHeight: 1.6, textWrap: 'pretty' }}>
          Precios en pesos y transparentes. Si tu proyecto tiene necesidades específicas, cotizamos
          sin compromiso.
        </p>
      </Reveal>

      {/* Banner cotización personalizada */}
      <Reveal
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          padding: '24px 28px',
          marginBottom: '32px',
          borderRadius: '18px',
          background: 'rgba(34,224,122,.06)',
          border: '1px solid rgba(34,224,122,.25)',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <h3 style={{ fontFamily: T.display, fontSize: '18px', fontWeight: 600, margin: '0 0 4px' }}>
            ¿Proyecto a la medida?
          </h3>
          <p style={{ fontSize: '14.5px', color: T.muted, margin: 0, lineHeight: 1.5 }}>
            Si tu idea no encaja en ningún plan estándar, cuéntanos y construimos la solución exacta
            que necesitas.
          </p>
        </div>
        <WhatsAppButton text="Hola, quiero cotizar un proyecto personalizado con CachRamn">
          Cotización personalizada
        </WhatsAppButton>
      </Reveal>

      {/* Planes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '20px',
          alignItems: 'stretch',
        }}
      >
        {planes.map((plan) => (
          <Reveal
            key={plan.id}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              padding: '34px 30px',
              borderRadius: '22px',
              background: plan.destacado
                ? 'linear-gradient(180deg, rgba(34,224,122,.10), rgba(255,255,255,.02))'
                : T.surface,
              border: plan.destacado
                ? '1px solid rgba(34,224,122,.45)'
                : `1px solid ${T.border}`,
              boxShadow: plan.destacado ? '0 24px 60px rgba(34,224,122,.14)' : 'none',
            }}
          >
            {plan.destacado && (
              <div
                aria-label="Plan más popular"
                style={{
                  position: 'absolute',
                  top: '-13px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  background: T.green,
                  color: T.ink,
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '.02em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 18px rgba(34,224,122,.4)',
                }}
              >
                MÁS POPULAR
              </div>
            )}

            <h3 style={{ fontFamily: T.display, fontSize: '19px', fontWeight: 600, margin: '0 0 6px' }}>
              {plan.nombre}
            </h3>
            <p style={{ fontSize: '14px', color: T.muted, margin: '0 0 20px', lineHeight: 1.5 }}>
              {plan.descripcion}
            </p>

            <div style={{ marginBottom: '6px' }}>
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: '11px',
                  color: T.faint,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                }}
              >
                Desde
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginTop: '4px' }}>
                <span style={{ fontSize: '15px', color: T.faint, fontWeight: 600 }}>$</span>
                <span
                  style={{
                    fontFamily: T.display,
                    fontSize: '40px',
                    fontWeight: 700,
                    letterSpacing: '-.03em',
                  }}
                >
                  {plan.precio}
                </span>
                <span style={{ fontSize: '14px', color: T.faint }}>MXN</span>
              </div>
              <p style={{ fontSize: '13px', color: T.faint, margin: '4px 0 0' }}>{plan.sufijo}</p>
            </div>

            <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '22px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px', flex: 1 }}>
              {plan.features.map((f) => (
                <div
                  key={f}
                  style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '14.5px', color: '#C5D6CC' }}
                >
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(34,224,122,.15)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={T.green}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {f}
                </div>
              ))}
            </div>

            <WhatsAppButton
              text={plan.waText}
              variant={plan.destacado ? 'solid' : 'ghost'}
              style={{ width: '100%' }}
            >
              {plan.destacado ? 'Empezar ahora' : 'Consultar precio'}
            </WhatsAppButton>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
