import React, { useState, useEffect, useCallback } from 'react'
import { getMessages, deleteMessage } from '../../services/api.js'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function MessagesTab({ onAuthError }) {
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const LIMIT = 50

  const fetchMessages = useCallback(async (p) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMessages(p, LIMIT)
      setMessages(data.data)
      setTotal(data.total)
    } catch (err) {
      if (err.status === 401) {
        onAuthError()
      } else {
        setError('No se pudieron cargar los mensajes.')
      }
    } finally {
      setLoading(false)
    }
  }, [onAuthError])

  useEffect(() => {
    fetchMessages(page)
  }, [fetchMessages, page])

  async function handleDelete(id) {
    setDeleting(true)
    try {
      await deleteMessage(id)
      setConfirmId(null)
      fetchMessages(page)
    } catch (err) {
      if (err.status === 401) onAuthError()
      else setError('No se pudo eliminar el mensaje.')
    } finally {
      setDeleting(false)
    }
  }

  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#F0F0F5]">
          Mensajes de WhatsApp
          {total > 0 && (
            <span className="ml-2 text-xs font-normal text-[#9898B0]">({total} total)</span>
          )}
        </h2>
        <button
          onClick={() => fetchMessages(page)}
          disabled={loading}
          className="text-xs text-[#6C63FF] hover:text-[#a89bff] transition-colors disabled:opacity-50"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div role="alert" className="bg-red-900/20 border border-red-700/40 rounded-lg p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-[#9898B0] text-sm" aria-live="polite">Cargando mensajes...</p>
      )}

      {!loading && messages.length === 0 && !error && (
        <div className="bg-[#1A1D26] border border-[#2E3150] rounded-xl p-12 text-center">
          <p className="text-[#9898B0] text-sm">No hay mensajes en este momento.</p>
        </div>
      )}

      {messages.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-[#2E3150]">
          <table className="w-full text-sm" aria-label="Lista de mensajes de WhatsApp">
            <thead>
              <tr className="bg-[#22263A] text-left">
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide">Teléfono</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide">Nombre</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide">Dirección</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide min-w-[200px]">Mensaje</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide whitespace-nowrap">Recibido</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide whitespace-nowrap">Expira</th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold text-[#9898B0] uppercase tracking-wide">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E3150]">
              {messages.map((m) => (
                <tr key={m.id} className="bg-[#1A1D26] hover:bg-[#22263A] transition-colors">
                  <td className="px-4 py-3 text-[#F0F0F5] font-mono text-xs whitespace-nowrap">{m.phone_number}</td>
                  <td className="px-4 py-3 text-[#9898B0] text-xs">{m.contact_name || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        m.direction === 'incoming'
                          ? 'bg-sky-900/40 text-sky-300 border border-sky-700/40'
                          : 'bg-violet-900/40 text-violet-300 border border-violet-700/40'
                      }`}
                    >
                      {m.direction === 'incoming' ? 'Entrante' : 'Saliente'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#9898B0] text-xs max-w-xs">
                    <p className="line-clamp-2">{m.body}</p>
                  </td>
                  <td className="px-4 py-3 text-[#9898B0] text-xs whitespace-nowrap">{formatDate(m.created_at)}</td>
                  <td className="px-4 py-3 text-[#9898B0] text-xs whitespace-nowrap">{formatDate(m.expires_at)}</td>
                  <td className="px-4 py-3">
                    {confirmId === m.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(m.id)}
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
                        onClick={() => setConfirmId(m.id)}
                        className="text-xs text-[#9898B0] hover:text-red-400 transition-colors"
                        aria-label={`Eliminar mensaje de ${m.phone_number}`}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Paginación de mensajes" className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm text-[#9898B0] hover:text-[#F0F0F5] disabled:opacity-40 disabled:cursor-not-allowed border border-[#2E3150] rounded-lg transition-colors"
          >
            Anterior
          </button>
          <p className="text-xs text-[#9898B0]">
            Página {page} de {totalPages}
          </p>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm text-[#9898B0] hover:text-[#F0F0F5] disabled:opacity-40 disabled:cursor-not-allowed border border-[#2E3150] rounded-lg transition-colors"
          >
            Siguiente
          </button>
        </nav>
      )}
    </div>
  )
}
