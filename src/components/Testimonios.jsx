import React from 'react'
import { T, Eyebrow, Reveal } from './_ui.jsx'

const testimonios = [
  {
    id: 1,
    nombre: 'Gabriela Morales',
    empresa: 'Despacho Jurídico Morales & Asociados',
    texto:
      'CachRamn transformó nuestra presencia en línea. El sitio quedó exactamente como lo imaginamos y el proceso fue claro y rápido. En menos de tres semanas ya teníamos clientes llegando por Google.',
    iniciales: 'GM',
  },
  {
    id: 2,
    nombre: 'Rodrigo Salinas',
    empresa: 'Constructora SalinasGroup',
    texto:
      'Necesitábamos algo más que un sitio bonito: queríamos capturar leads calificados. La integración con WhatsApp que hizo CachRamn nos ahorra horas de seguimiento manual cada semana.',
    iniciales: 'RS',
  },
  {
    id: 3,
    nombre: 'Valeria Espinoza',
    empresa: 'Spa & Wellness Valeria',
    texto:
      'Muy buena comunicación desde el inicio. Explicaron cada decisión y cumplieron los tiempos prometidos. El sistema de citas en WhatsApp que integraron ha mejorado mucho la experiencia de mis clientes.',
    iniciales: 'VE',
  },
]

export default function Testimonios() {
  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-heading"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '90px 28px 60px' }}
    >
      <Reveal style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 50px' }}>
        <Eyebrow>// LO QUE DICEN</Eyebrow>
        <h2
          id="testimonios-heading"
          style={{
            fontFamily: T.display,
            fontSize: 'clamp(32px, 4.5vw, 44px)',
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: '-.03em',
            margin: 0,
          }}
        >
          Clientes que ya despegaron
        </h2>
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '18px',
        }}
      >
        {testimonios.map((t) => (
          <Reveal
            key={t.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '30px 28px',
              borderRadius: '20px',
              background: T.surface,
              border: `1px solid ${T.border}`,
            }}
          >
            <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }} aria-label="5 estrellas">
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} style={{ color: T.green, fontSize: '15px' }}>
                  ★
                </span>
              ))}
            </div>

            <blockquote
              style={{
                fontSize: '15.5px',
                lineHeight: 1.6,
                color: '#D2E0D7',
                margin: '0 0 22px',
                flex: 1,
                textWrap: 'pretty',
              }}
            >
              &ldquo;{t.texto}&rdquo;
            </blockquote>

            <footer style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                aria-hidden="true"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: T.display,
                  fontWeight: 700,
                  color: T.ink,
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                {t.iniciales}
              </div>
              <cite style={{ fontStyle: 'normal' }}>
                <p style={{ fontWeight: 600, fontSize: '15px', margin: 0 }}>{t.nombre}</p>
                <p style={{ fontSize: '13px', color: T.faint, margin: '1px 0 0' }}>{t.empresa}</p>
              </cite>
            </footer>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
