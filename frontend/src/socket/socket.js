import { io } from 'socket.io-client'

const socket = io( import.meta.env.VITE_API_URL, {
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
})

export default socket
