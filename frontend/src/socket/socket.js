import { io } from 'socket.io-client'

const rawApiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

const getSocketServerUrl = (apiUrl) => {
  try {
    const parsed = new URL(apiUrl)
    return parsed.origin
  } catch {
    return apiUrl.replace(/\/api\/?$/i, '').replace(/\/+$/, '')
  }
}

const socket = io(getSocketServerUrl(rawApiUrl), {
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
})

export default socket
