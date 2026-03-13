import axios from 'axios'

const rawBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

const normalizeApiBaseUrl = (url) => {
  try {
    const parsed = new URL(url)
    const pathname = parsed.pathname.replace(/\/+$/, '')

    if (!pathname || pathname === '/') {
      parsed.pathname = '/api'
    } else if (/^\/api(\/.*)?$/i.test(pathname)) {
      parsed.pathname = '/api'
    } else if (/^\/auth(\/.*)?$/i.test(pathname)) {
      parsed.pathname = '/api'
    } else {
      parsed.pathname = `${pathname}/api`
    }

    parsed.search = ''
    parsed.hash = ''
    return parsed.toString().replace(/\/+$/, '')
  } catch {
    const trimmed = url.replace(/\/+$/, '')
    const withoutAuthOrApi = trimmed.replace(/\/(api|auth)(\/.*)?$/i, '')
    return `${withoutAuthOrApi}/api`
  }
}

const API_BASE_URL = normalizeApiBaseUrl(rawBaseUrl)

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
