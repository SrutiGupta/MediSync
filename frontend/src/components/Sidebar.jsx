import { NavLink } from 'react-router-dom'
import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaClipboardList,
  FaBed,
} from 'react-icons/fa'

const navItems = [
  { label: 'Home', icon: FaHome, to: '/' },
  { label: 'Dashboard', icon: FaChartBar, to: '/dashboard' },
  { label: 'Patients', icon: FaUsers, to: '/patients' },
  { label: 'Queue', icon: FaClipboardList, to: '/queue' },
  { label: 'Beds', icon: FaBed, to: '/beds' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-20">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700/60">
        <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
          🏥 <span>MediSync</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 ml-7">Hospital Management System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700/60">
        <p className="text-xs text-slate-500">v1.0.0 &middot; MediSync</p>
      </div>
    </aside>
  )
}
