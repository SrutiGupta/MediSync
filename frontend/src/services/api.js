import axios from 'axios'

const rawBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

const normalizeApiBaseUrl = (url) => {
  const trimmed = url.replace(/\/+$/, '')
  return /\/api$/i.test(trimmed) ? trimmed : `${trimmed}/api`
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
