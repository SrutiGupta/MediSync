import { useNavigate } from 'react-router-dom'

export default function ReceptionDashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-5xl mb-4">🏥</div>
        <h1 className="text-3xl font-bold text-slate-800">Receptionist Dashboard</h1>
        <p className="text-slate-500 mt-2 text-sm">Patient intake & bed assignment — role: Receptionist</p>
        <button
          onClick={handleLogout}
          className="mt-6 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
