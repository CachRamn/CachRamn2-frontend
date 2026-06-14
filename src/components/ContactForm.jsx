import React, { useState } from 'react'
import { postContact } from '../services/api.js'
import { T, Eyebrow, Reveal } from './_ui.jsx'

const WA_NUMBER = import.meta.env.VITE_WA_NUMBER

const SERVICIOS = [
  { value: 'landing-estatica', label: 'Landing Page Estática' },
  { value: 'sitio-estatico', label: 'Sitio Web Estático' },
  { value: 'api-integrada', label: 'Landing / Sitio con API Integrada' },
]

const initialState = {
  nombre: '',
  servicio: '',
  mensaje: '',
  email: '',
  telefono: '',
}

export default function ContactForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | error

  function validate(data) {
    const e = {}
    if (!data.nombre.trim()) e.nombre = 'El nombre es requerido.'
    if (!data.servicio) e.servicio = 'Selecciona un servicio.'
    if (!data.mensaje.trim()) e.mensaje = 'El mensaje es requerido.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstKey = Object.keys(validationErrors)[0]
      document.getElementById(`field-${firstKey}`)?.focus()
      return
    }

    setStatus('loading')
    try {
      await postContact({
        name: form.nombre.trim(),
        service_interest: form.servicio,
        message: form.mensaje.trim(),
        email: form.email.trim() || null,
        phone: form.telefono.trim() || null,
      })

      const servicioLabel =
        SERVICIOS.find((s) => s.value === form.servicio)?.label || form.servicio
      const text = `Hola, soy ${form.nombre.trim()}, me interesa ${servicioLabel}: ${form.mensaje.trim()}`
      const encoded = encodeURIComponent(text)
      window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer')
      setForm(initialState)
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  // ---- estilos compartidos de inputs ----
  const labelStyle = { fontSize: '13px', fontWeight: 600, color: T.muted }
  const inputStyle = (field) => ({
    width: '100%',
    padding: '13px 15px',
    borderRadius: '11px',
    border: `1px solid ${errors[field] ? 'rgba(248,113,113,.7)' : 'rgba(255,255,255,.10)'}`,
    background: 'rgba(255,255,255,.03)',
    color: T.text,
    fontSize: '14.5px',
    fontFamily: T.body,
    outline: 'none',
    resize: 'none',
    transition: 'border-color .2s, background .2s',
  })
  const onFocus = (e) => {
    e.currentTarget.style.borderColor = 'rgba(34,224,122,.5)'
    e.currentTarget.style.background = 'rgba(34,224,122,.04)'
  }
  const onBlur = (field) => (e) => {
    e.currentTarget.style.borderColor = errors[field]
      ? 'rgba(248,113,113,.7)'
      : 'rgba(255,255,255,.10)'
    e.currentTarget.style.background = 'rgba(255,255,255,.03)'
  }
  const errMsg = (id, msg) =>
    msg ? (
      <p id={id} role="alert" style={{ color: '#f87171', fontSize: '12px', margin: '2px 0 0' }}>
        {msg}
      </p>
    ) : null

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 28px 40px' }}
    >
      <Reveal
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '28px',
          border: '1px solid rgba(34,224,122,.18)',
          background: 'linear-gradient(135deg, rgba(34,224,122,.08), rgba(7,16,11,.4))',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(34,224,122,.22), transparent 65%)',
            filter: 'blur(30px)',
            animation: 'cr-pulseGlow 8s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap' }}>
          {/* Lado info */}
          <div style={{ flex: '1 1 380px', padding: '52px 44px' }}>
            <Eyebrow>// HABLEMOS</Eyebrow>
            <h2
              id="contacto-heading"
              style={{
                fontFamily: T.display,
                fontSize: 'clamp(28px, 3.6vw, 40px)',
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: '-.03em',
                margin: '0 0 18px',
              }}
            >
              Cuéntanos tu idea y te respondemos hoy mismo
            </h2>
            <p style={{ fontSize: '16.5px', color: T.muted, lineHeight: 1.6, margin: '0 0 32px', textWrap: 'pretty' }}>
              Llena el formulario y te llevamos directo a WhatsApp con tu información lista. Sin
              compromiso: primero platicamos, luego cotizamos.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(34,224,122,.1)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={T.green} aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: '12px', color: T.faint }}>WhatsApp</div>
                  <div style={{ fontWeight: 600, fontSize: '15.5px' }}>Respuesta el mismo día</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado formulario */}
          <div
            style={{
              flex: '1 1 380px',
              padding: '44px',
              background: 'rgba(7,16,11,.5)',
              borderLeft: '1px solid rgba(255,255,255,.06)',
            }}
          >
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Nombre */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label htmlFor="field-nombre" style={labelStyle}>
                  Nombre <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
                  <span className="sr-only">(requerido)</span>
                </label>
                <input
                  type="text"
                  id="field-nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur('nombre')}
                  autoComplete="name"
                  style={inputStyle('nombre')}
                  placeholder="Tu nombre o el de tu empresa"
                  aria-required="true"
                  aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                  aria-invalid={errors.nombre ? 'true' : 'false'}
                />
                {errMsg('error-nombre', errors.nombre)}
              </div>

              {/* Servicio */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label htmlFor="field-servicio" style={labelStyle}>
                  Servicio de interés <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
                  <span className="sr-only">(requerido)</span>
                </label>
                <select
                  id="field-servicio"
                  name="servicio"
                  value={form.servicio}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur('servicio')}
                  style={{ ...inputStyle('servicio'), appearance: 'none' }}
                  aria-required="true"
                  aria-describedby={errors.servicio ? 'error-servicio' : undefined}
                  aria-invalid={errors.servicio ? 'true' : 'false'}
                >
                  <option value="" disabled>
                    Selecciona un servicio
                  </option>
                  {SERVICIOS.map((s) => (
                    <option key={s.value} value={s.value} style={{ background: '#0C1712' }}>
                      {s.label}
                    </option>
                  ))}
                </select>
                {errMsg('error-servicio', errors.servicio)}
              </div>

              {/* Mensaje */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label htmlFor="field-mensaje" style={labelStyle}>
                  Mensaje <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
                  <span className="sr-only">(requerido)</span>
                </label>
                <textarea
                  id="field-mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur('mensaje')}
                  rows={3}
                  style={inputStyle('mensaje')}
                  placeholder="Cuéntanos qué necesitas y en qué etapa está tu proyecto"
                  aria-required="true"
                  aria-describedby={errors.mensaje ? 'error-mensaje' : undefined}
                  aria-invalid={errors.mensaje ? 'true' : 'false'}
                />
                {errMsg('error-mensaje', errors.mensaje)}
              </div>

              {/* Email — opcional */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label htmlFor="field-email" style={labelStyle}>
                  Correo electrónico{' '}
                  <span style={{ color: T.faint, fontWeight: 400, fontSize: '12px' }}>(opcional)</span>
                </label>
                <input
                  type="email"
                  id="field-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur('email')}
                  autoComplete="email"
                  style={inputStyle('email')}
                  placeholder="tu@correo.com"
                />
              </div>

              {/* Teléfono — opcional */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <label htmlFor="field-telefono" style={labelStyle}>
                  Teléfono{' '}
                  <span style={{ color: T.faint, fontWeight: 400, fontSize: '12px' }}>(opcional)</span>
                </label>
                <input
                  type="tel"
                  id="field-telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur('telefono')}
                  autoComplete="tel"
                  style={inputStyle('telefono')}
                  placeholder="55 1234 5678"
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    background: 'rgba(127,29,29,.2)',
                    border: '1px solid rgba(185,28,28,.4)',
                    borderRadius: '11px',
                    padding: '14px',
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ flexShrink: 0, marginTop: '1px' }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p style={{ color: '#fca5a5', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                    Hubo un problema al enviar tu mensaje. Revisa tu conexión e intenta de nuevo.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
                onMouseEnter={(e) => {
                  if (status !== 'loading') {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(34,224,122,.5)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(34,224,122,.32)'
                }}
                style={{
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '15px',
                  borderRadius: '12px',
                  border: 'none',
                  background: T.green,
                  color: T.ink,
                  fontWeight: 700,
                  fontSize: '15.5px',
                  fontFamily: T.body,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                  boxShadow: '0 10px 30px rgba(34,224,122,.32)',
                  transition: 'transform .2s, box-shadow .2s',
                }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill={T.ink} aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" />
                </svg>
                {status === 'loading' ? 'Enviando…' : 'Enviar y continuar en WhatsApp'}
              </button>

              <p style={{ fontSize: '12px', color: T.faint, textAlign: 'center', margin: 0 }}>
                Al enviar, serás redirigido al chat de WhatsApp con tu información prellenada.
              </p>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
