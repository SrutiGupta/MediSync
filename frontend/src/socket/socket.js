import { io } from 'socket.io-client'

const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

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

const apiBaseUrl = normalizeApiBaseUrl(rawApiUrl)

const getSocketServerUrl = (apiUrl) => {
  try {
    const parsed = new URL(apiUrl)
    return parsed.origin
  } catch {
    return apiUrl.replace(/\/api\/?$/i, '').replace(/\/+$/, '')
  }
}

const socket = io(getSocketServerUrl(apiBaseUrl), {
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
})

export default socket
