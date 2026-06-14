import React, { useState, useEffect, useCallback } from 'react'
import { getResponses, createResponse, updateResponse, deleteResponse } from '../../services/api.js'

const FLOW_STEP_LABELS = {
  1: 'Empresa',
  2: 'Precios',
  3: 'Cierre',
}

const emptyForm = { flow_step: '', title: '', body: '', sort_order: 0 }

function ResponseForm({ initial = emptyForm, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  function validate(d) {
    const e = {}
    if (!d.flow_step) e.flow_step = 'Selecciona un paso de flujo.'
    if (!d.title.trim()) e.title = 'El título es requerido.'
    if (!d.body.trim()) e.body = 'El cuerpo es requerido.'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'flow_step' || name === 'sort_order' ? Number(value) : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  const input = (field) =>
    `w-full bg-[#0F1117] border ${errors[field] ? 'border-red-500' : 'border-[#2E3150]'} text-[#F0F0F5] rounded-lg px-3 py-2 text-sm placeholder:text-[#9898B0]/60 focus:outline-none focus:border-[#6C63FF] transition-colors`

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#22263A] border border-[#2E3150] rounded-xl p-5 flex flex-col gap-4"
      aria-label={initial.title ? 'Editar respuesta' : 'Nueva respuesta'}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="resp-flow_step" className="text-xs font-medium text-[#9898B0]">
            Paso de flujo <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <select
            id="resp-flow_step"
            name="flow_step"
            value={form.flow_step}
            onChange={handleChange}
            className={`${input('flow_step')} appearance-none`}
            aria-required="true"
          >
            <option value="" disabled>Selecciona...</option>
            <option value={1}>1 — Empresa</option>
            <option value={2}>2 — Precios</option>
            <option value={3}>3 — Cierre</option>
          </select>
          {errors.flow_step && <p className="text-red-400 text-xs">{errors.flow_step}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="resp-sort_order" className="text-xs font-medium text-[#9898B0]">
            Orden
          </label>
          <input
            type="number"
            id="resp-sort_order"
            name="sort_order"
            value={form.sort_order}
            onChange={handleChange}
            min={0}
            className={input('sort_order')}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="resp-title" className="text-xs font-medium text-[#9898B0]">
          Título (visible en panel) <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="resp-title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={input('title')}
          placeholder="Nombre descriptivo"
          aria-required="true"
        />
        {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="resp-body" className="text-xs font-medium text-[#9898B0]">
          Cuerpo (texto enviado al prospecto) <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <textarea
          id="resp-body"
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={4}
          className={input('body')}
          placeholder="Hola, gracias por escribirnos..."
          aria-required="true"
        />
        {errors.body && <p className="text-red-400 text-xs">{errors.body}</p>}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-[#9898B0] hover:text-[#F0F0F5] border border-[#2E3150] rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm bg-[#6C63FF] hover:bg-[#5A52E0] disabled:opacity-60 text-white font-medium rounded-lg transition-colors"
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default function ResponsesTab({ onAuthError }) {
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const fetchResponses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getResponses()
      setResponses(data.data)
    } catch (err) {
      if (err.status === 401) onAuthError()
      else setError('No se pudieron cargar las respuestas.')
    } finally {
      setLoading(false)
    }
  }, [onAuthError])

  useEffect(() => { fetchResponses() }, [fetchResponses])

  async function handleCreate(form) {
    setSaving(true)
    try {
      await createResponse(form)
      setShowNewForm(false)
      fetchResponses()
    } catch (err) {
      if (err.status === 401) onAuthError()
      else setError('Error al crear la respuesta.')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(id, form) {
    setSaving(true)
    try {
      await updateResponse(id, form)
      setEditingId(null)
      fetchResponses()
    } catch (err) {
      if (err.status === 401) onAuthError()
      else setError('Error al actualizar la respuesta.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    setDeleting(true)
    try {
      await deleteResponse(id)
      setConfirmId(null)
      fetchResponses()
    } catch (err) {
      if (err.status === 401) onAuthError()
      else setError('Error al eliminar la respuesta.')
    } finally {
      setDeleting(false)
    }
  }

  const grouped = [1, 2, 3].map((step) => ({
    step,
    label: FLOW_STEP_LABELS[step],
    items: responses
      .filter((r) => r.flow_step === step)
      .sort((a, b) => a.sort_order - b.sort_order),
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#F0F0F5]">Respuestas precargadas</h2>
        {!showNewForm && (
          <button
            onClick={() => { setShowNewForm(true); setEditingId(null) }}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#6C63FF] hover:bg-[#5A52E0] text-white font-medium rounded-lg transition-colors"
          >
            <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Agregar respuesta
          </button>
        )}
      </div>

      {error && (
        <div role="alert" className="bg-red-900/20 border border-red-700/40 rounded-lg p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {showNewForm && (
        <ResponseForm
          onSave={handleCreate}
          onCancel={() => setShowNewForm(false)}
          saving={saving}
        />
      )}

      {loading && <p className="text-[#9898B0] text-sm" aria-live="polite">Cargando...</p>}

      {!loading && grouped.map(({ step, label, items }) => (
        <section key={step} aria-labelledby={`step-${step}-heading`}>
          <h3
            id={`step-${step}-heading`}
            className="text-xs font-semibold text-[#9898B0] uppercase tracking-widest mb-3 flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full bg-[#22263A] border border-[#2E3150] flex items-center justify-center text-[#6C63FF] text-xs">
              {step}
            </span>
            Paso {step} — {label}
          </h3>

          {items.length === 0 && (
            <p className="text-[#9898B0] text-xs pl-7 pb-4">Sin respuestas en este paso.</p>
          )}

          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {items.map((r) => (
              <li key={r.id}>
                {editingId === r.id ? (
                  <ResponseForm
                    initial={r}
                    onSave={(form) => handleUpdate(r.id, form)}
                    onCancel={() => setEditingId(null)}
                    saving={saving}
                  />
                ) : (
                  <div className="bg-[#1A1D26] border border-[#2E3150] rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-[#F0F0F5] truncate">{r.title}</p>
                        <span className="text-xs text-[#9898B0] flex-shrink-0">Orden {r.sort_order}</span>
                      </div>
                      <p className="text-xs text-[#9898B0] whitespace-pre-line line-clamp-3">{r.body}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        onClick={() => { setEditingId(r.id); setShowNewForm(false) }}
                        className="text-xs text-[#6C63FF] hover:text-[#a89bff] transition-colors"
                        aria-label={`Editar respuesta: ${r.title}`}
                      >
                        Editar
                      </button>

                      {confirmId === r.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(r.id)}
                            disabled={deleting}
                            className="text-xs text-red-400 hover:text-red-300 font-medium disabled:opacity-50"
                          >
                            {deleting ? 'Eliminando...' : 'Confirmar'}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs text-[#9898B0] hover:text-[#F0F0F5]"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(r.id)}
                          className="text-xs text-[#9898B0] hover:text-red-400 transition-colors"
                          aria-label={`Eliminar respuesta: ${r.title}`}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
