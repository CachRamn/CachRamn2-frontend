const BASE_URL = import.meta.env.VITE_API_BASE_URL

function getAuthHeader() {
  const jwt = sessionStorage.getItem('cachramn_jwt')
  return jwt ? { Authorization: `Bearer ${jwt}` } : {}
}

async function handleResponse(res) {
  if (res.status === 401) {
    sessionStorage.removeItem('cachramn_jwt')
    sessionStorage.removeItem('cachramn_jwt_expires')
    throw Object.assign(new Error('Unauthorized'), { status: 401 })
  }
  if (res.status === 429) {
    throw Object.assign(new Error('Too many requests'), { status: 429 })
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(body.message || 'Error del servidor'), { status: res.status })
  }
  return res.json()
}

export async function postContact(data) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function adminLogin(username, token) {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, token }),
  })
  return handleResponse(res)
}

export async function getMessages(page = 1, limit = 50) {
  const res = await fetch(`${BASE_URL}/api/admin/messages?page=${page}&limit=${limit}`, {
    headers: { ...getAuthHeader() },
  })
  return handleResponse(res)
}

export async function deleteMessage(id) {
  const res = await fetch(`${BASE_URL}/api/admin/messages/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  })
  return handleResponse(res)
}

export async function getResponses() {
  const res = await fetch(`${BASE_URL}/api/admin/responses`, {
    headers: { ...getAuthHeader() },
  })
  return handleResponse(res)
}

export async function createResponse(data) {
  const res = await fetch(`${BASE_URL}/api/admin/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function updateResponse(id, data) {
  const res = await fetch(`${BASE_URL}/api/admin/responses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteResponse(id) {
  const res = await fetch(`${BASE_URL}/api/admin/responses/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() },
  })
  return handleResponse(res)
}

export function isAuthenticated() {
  const jwt = sessionStorage.getItem('cachramn_jwt')
  const expires = sessionStorage.getItem('cachramn_jwt_expires')
  if (!jwt || !expires) return false
  return new Date(expires) > new Date()
}

export function saveSession(jwt, expiresAt) {
  sessionStorage.setItem('cachramn_jwt', jwt)
  sessionStorage.setItem('cachramn_jwt_expires', expiresAt)
}

export function clearSession() {
  sessionStorage.removeItem('cachramn_jwt')
  sessionStorage.removeItem('cachramn_jwt_expires')
}
