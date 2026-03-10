import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
      {/* Left side — page context */}
      <div>
        <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">
          Hospital Bed &amp; Patient Management
        </p>
      </div>

      {/* Right side — user info + logout */}
      <div className="flex items-center gap-4">
        {/* User Role Badge */}
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
          <FaUserCircle className="w-5 h-5 text-blue-500" />
          <div className="leading-tight">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-slate-700">Receptionist</p>
          </div>
          <span className="ml-1 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
            Staff
          </span>
        </div>

        {/* Logout */}
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-150 px-4 py-2 rounded-xl shadow-sm shadow-red-200"
        >
          <FaSignOutAlt className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  )
}
