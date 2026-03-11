import { useNavigate } from 'react-router-dom'
import { FaUserShield, FaSignOutAlt, FaBell } from 'react-icons/fa'

export default function AdminNavbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-6 z-10 shadow-sm">
      {/* Left — breadcrumb / page title */}
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Admin
        </p>
        <h2 className="text-sm font-bold text-slate-700 leading-tight">
          Dashboard Overview
        </h2>
      </div>

      {/* Right — notifications + role + logout */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          type="button"
          className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <FaBell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Role badge */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <FaUserShield className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] text-slate-400 font-medium">Signed in as</p>
            <p className="text-xs font-bold text-slate-700">Administrator</p>
          </div>
          <span className="ml-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            Admin
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center gap-2 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-150 px-3.5 py-2 rounded-xl shadow-sm shadow-red-200"
        >
          <FaSignOutAlt className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </header>
  )
}