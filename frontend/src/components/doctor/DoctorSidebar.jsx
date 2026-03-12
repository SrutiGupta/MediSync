import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaThLarge,
  FaUserInjured,
  FaBed,
  FaSignOutAlt,
} from 'react-icons/fa'
import { MdLocalHospital } from 'react-icons/md'

const navItems = [
  { label: 'Dashboard', icon: FaThLarge, to: '/doctor/dashboard' },
  { label: 'Patients', icon: FaUserInjured, to: '/doctor/patients' },
  { label: 'Beds', icon: FaBed, to: '/doctor/beds' },
]

export default function DoctorSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-20 select-none">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/30 flex-shrink-0">
            <MdLocalHospital className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wide text-white">MediSync</h1>
            <p className="text-[10px] text-slate-400 leading-tight">Hospital Management System</p>
          </div>
        </div>
      </div>

      {/* Role badge */}
      

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-4 mb-2 mt-1">
          Menu
        </p>
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-teal-400'
                  }`}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-700/60">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 group"
        >
          <FaSignOutAlt className="w-4 h-4 flex-shrink-0 group-hover:text-red-400" />
          Logout
        </button>
        <p className="text-[10px] text-slate-600 text-center mt-3">v1.0.0 &middot; MediSync</p>
      </div>
    </aside>
  )
}
