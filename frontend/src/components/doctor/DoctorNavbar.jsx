import { useNavigate } from 'react-router-dom'
import { FaUserMd, FaSignOutAlt } from 'react-icons/fa'
import NotificationBell from '../NotificationBell'

export default function DoctorNavbar({ title = 'Dashboard Overview' }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 z-10 shadow-sm">
      {/* Left — page title */}
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Doctor</p>
        <h2 className="text-sm font-bold text-slate-700 leading-tight">{title}</h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <NotificationBell />

        <div className="w-px h-6 bg-slate-200" />

        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center flex-shrink-0">
            <FaUserMd className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] text-slate-400 font-medium">Signed in as</p>
            <p className="text-xs font-bold text-slate-700">Doctor</p>
          </div>
          <span className="ml-1 bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            MD
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-red-500 transition-colors px-2 py-1.5"
        >
          <FaSignOutAlt className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </header>
  )
}
