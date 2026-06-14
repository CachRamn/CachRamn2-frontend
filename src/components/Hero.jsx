import React, { useState, useEffect, useRef } from 'react'
import WhatsAppButton from './WhatsAppButton.jsx'
import { T } from './_ui.jsx'

// Conversación que se "escribe sola" en el widget del hero
const MESSAGES = [
  { from: 'them', text: 'Hola 👋 vi su página. ¿Hacen tiendas en línea?', delay: 1300 },
  { from: 'me', text: '¡Claro! Te armamos tu tienda con pagos y envíos. ¿Qué vendes?', delay: 1600 },
  { from: 'them', text: 'Ropa. ¿Cuánto tardan?', delay: 1200 },
  { from: 'me', text: '2 semanas y queda lista para vender 🚀', delay: 1500 },
  { from: 'them', text: '¡Va! Me interesa 🙌', delay: 1100 },
]

const MARQUEE = [
  'React', 'Next.js', 'APIs a medida', 'WhatsApp Business', 'SEO',
  'Diseño UX', 'Automatización', 'Pagos en línea', 'Landing Pages', 'Paneles admin',
]

function ChatWidget() {
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(null)
  const timers = useRef([])

  useEffect(() => {
    let cancelled = false
    const clear = () => timers.current.forEach(clearTimeout)
    const push = (fn, ms) => {
      const id = setTimeout(() => !cancelled && fn(), ms)
      timers.current.push(id)
    }
    const step = (i) => {
      if (cancelled) return
      if (i >= MESSAGES.length) {
        push(() => {
          setVisible(0)
          setTyping(null)
          push(() => step(0), 600)
        }, 3800)
        return
      }
      const msg = MESSAGES[i]
      setTyping(msg.from)
      push(() => {
        setVisible(i + 1)
        setTyping(null)
        push(() => step(i + 1), 650)
      }, msg.delay)
    }
    step(0)
    return () => {
      cancelled = true
      clear()
    }
  }, [])

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '10px',
          background:
            'radial-gradient(circle at 50% 30%, rgba(34,224,122,.20), transparent 70%)',
          filter: 'blur(24px)',
          animation: 'cr-pulseGlow 6s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '340px',
          maxWidth: '100%',
          borderRadius: '26px',
          background: '#0C1712',
          border: '1px solid rgba(34,224,122,.16)',
          boxShadow: '0 30px 70px rgba(0,0,0,.55)',
          overflow: 'hidden',
          animation: 'cr-floaty 8s ease-in-out infinite',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 18px',
            background: 'linear-gradient(180deg, rgba(34,224,122,.10), transparent)',
            borderBottom: '1px solid rgba(255,255,255,.05)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: `linear-gradient(135deg,${T.green},${T.greenDark})`,
              display: 'grid',
              placeItems: 'center',
              fontFamily: T.display,
              fontWeight: 700,
              color: T.ink,
              fontSize: '17px',
            }}
          >
            CR
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>CachRamn</div>
            <div
              style={{
                fontSize: '12px',
                color: T.green,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.green }} />
              en línea
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '18px',
            minHeight: '312px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '9px',
            backgroundImage: 'radial-gradient(rgba(255,255,255,.022) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        >
          {MESSAGES.slice(0, visible).map((m, idx) => {
            const out = m.from === 'me'
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: out ? 'flex-end' : 'flex-start',
                  animation: 'cr-bubbleIn .4s cubic-bezier(.2,.8,.2,1) both',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '9px 13px',
                    borderRadius: out ? '15px 15px 4px 15px' : '15px 15px 15px 4px',
                    background: out ? T.green : '#16241B',
                    color: out ? T.ink : '#E7F3EB',
                    fontSize: '14px',
                    lineHeight: 1.42,
                    fontWeight: 500,
                    boxShadow: '0 2px 10px rgba(0,0,0,.22)',
                  }}
                >
                  {m.text}
                </div>
              </div>
            )
          })}
          {typing && (
            <div
              style={{
                display: 'flex',
                justifyContent: typing === 'me' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  padding: '11px 15px',
                  borderRadius: '15px',
                  background: typing === 'me' ? T.green : '#16241B',
                  display: 'flex',
                  gap: '4px',
                }}
              >
                {[0, 0.18, 0.36].map((d) => (
                  <span
                    key={d}
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: typing === 'me' ? '#0a3d22' : '#5f8a72',
                      animation: `cr-typingDot 1.1s ${d}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            borderTop: '1px solid rgba(255,255,255,.05)',
            background: 'rgba(255,255,255,.015)',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,.05)',
              fontSize: '13.5px',
              color: '#6f8579',
            }}
          >
            Escribe un mensaje…
          </div>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: T.green,
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 4px 14px rgba(34,224,122,.4)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={T.ink}>
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const stat = (n, l) => (
    <div>
      <div style={{ fontFamily: T.display, fontSize: '30px', fontWeight: 700, letterSpacing: '-.02em' }}>
        {n}
      </div>
      <div style={{ fontSize: '13px', color: T.faint, fontWeight: 500, marginTop: '2px' }}>{l}</div>
    </div>
  )

  return (
    <>
      <section
        id="inicio"
        aria-labelledby="hero-heading"
        style={{ position: 'relative', overflow: 'hidden', paddingTop: '66px' }}
      >
        {/* glows de fondo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-40px',
            left: '-120px',
            width: '460px',
            height: '460px',
            background: 'radial-gradient(circle, rgba(34,224,122,.18), transparent 65%)',
            filter: 'blur(20px)',
            animation: 'cr-pulseGlow 7s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-140px',
            right: '-60px',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(25,184,95,.14), transparent 65%)',
            filter: 'blur(20px)',
            animation: 'cr-pulseGlow 9s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '76px 28px 60px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Columna izquierda */}
          <div style={{ flex: '1 1 440px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '9px',
                padding: '7px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(34,224,122,.25)',
                background: 'rgba(34,224,122,.06)',
                fontFamily: T.mono,
                fontSize: '12.5px',
                fontWeight: 500,
                color: '#5FE39C',
                marginBottom: '26px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: T.green,
                  boxShadow: '0 0 0 4px rgba(34,224,122,.18)',
                }}
              />
              Disponibles para nuevos proyectos
            </div>

            <h1
              id="hero-heading"
              style={{
                fontFamily: T.display,
                fontSize: 'clamp(38px, 6vw, 62px)',
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: '-.035em',
                margin: '0 0 22px',
              }}
            >
              Tu próximo cliente
              <br />
              llega por <span style={{ color: T.green }}>WhatsApp.</span>
            </h1>

            <p
              style={{
                fontSize: '18.5px',
                lineHeight: 1.6,
                color: T.muted,
                maxWidth: '470px',
                margin: '0 0 34px',
                textWrap: 'pretty',
              }}
            >
              Diseñamos landing pages, sitios y plataformas con APIs a medida que convierten
              visitas en conversaciones. Sin formularios fríos: tus clientes te escriben directo,
              listos para comprar.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <WhatsAppButton
                text="Hola, me interesa cotizar un proyecto con CachRamn"
                style={{ padding: '15px 24px', fontSize: '15.5px' }}
              >
                Cotiza por WhatsApp
              </WhatsAppButton>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('portafolio')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(34,224,122,.4)'
                  e.currentTarget.style.background = 'rgba(34,224,122,.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.10)'
                  e.currentTarget.style.background = 'rgba(255,255,255,.03)'
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  padding: '15px 22px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,.03)',
                  border: '1px solid rgba(255,255,255,.10)',
                  color: T.text,
                  fontWeight: 600,
                  fontSize: '15.5px',
                  fontFamily: T.body,
                  cursor: 'pointer',
                  transition: 'border-color .2s, background .2s',
                }}
              >
                Ver portafolio <span style={{ color: T.green }}>→</span>
              </button>
            </div>

            {/* Stats — ⚠ cifras de ejemplo, ajústalas a tus números reales */}
            <div style={{ display: 'flex', gap: '38px', flexWrap: 'wrap' }}>
              {stat('+120', 'proyectos entregados')}
              <div style={{ width: '1px', background: 'rgba(255,255,255,.08)' }} />
              {stat('2 sem', 'entrega promedio')}
              <div style={{ width: '1px', background: 'rgba(255,255,255,.08)' }} />
              {stat(<>4.9<span style={{ color: T.green }}>★</span></>, 'satisfacción')}
            </div>
          </div>

          {/* Columna derecha: chat */}
          <div style={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center' }}>
            <ChatWidget />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div
        aria-hidden="true"
        style={{
          borderTop: '1px solid rgba(255,255,255,.06)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          padding: '22px 0',
          overflow: 'hidden',
          background: 'rgba(255,255,255,.012)',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'cr-marquee 26s linear infinite',
          }}
        >
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '34px', padding: '0 34px' }}
            >
              <span
                style={{
                  fontFamily: T.display,
                  fontSize: '20px',
                  fontWeight: 600,
                  color: T.muted,
                  whiteSpace: 'nowrap',
                  letterSpacing: '-.01em',
                }}
              >
                {w}
              </span>
              <span style={{ color: T.green, fontSize: '12px' }}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
