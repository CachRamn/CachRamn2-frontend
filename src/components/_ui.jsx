import React, { useRef, useEffect } from 'react'

// ============================================================
//  Sistema de diseño (rediseño CachRamn) — tokens compartidos
//  NUEVO archivo. Importado por los componentes públicos.
// ============================================================
export const T = {
  bg: '#07100B',
  text: '#EBF5EE',
  muted: '#9DB3A6',
  faint: '#7C9488',
  green: '#22E07A',
  greenDark: '#0E9F54',
  ink: '#04140B',
  surface: 'rgba(255,255,255,.018)',
  border: 'rgba(255,255,255,.08)',
  display: "'Space Grotesk', system-ui, sans-serif",
  body: "'Manrope', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
}

// Etiqueta mono tipo `// SECCIÓN`
export function Eyebrow({ children, style }) {
  return (
    <div
      style={{
        fontFamily: T.mono,
        fontSize: '13px',
        color: T.green,
        letterSpacing: '.08em',
        marginBottom: '14px',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Wrapper con animación scroll-reveal (respeta prefers-reduced-motion vía index.css)
export function Reveal({ children, style, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    el.style.transition =
      'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)'
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'none'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.14 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} style={style} {...rest}>
      {children}
    </Tag>
  )
}
