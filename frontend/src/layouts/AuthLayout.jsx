import heroImage from '../assets/image.jpg'
import logo from '../assets/logo.jpg'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── RIGHT: Hero image (renders on top on mobile) ─────────── */}
      <div className="relative w-full h-52 md:h-auto md:w-[55%] order-first md:order-last flex-shrink-0">
        <img
          src={heroImage}
          alt="Hospital"
          className="w-full h-full object-cover"
        />
        {/* Blue overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/25 to-transparent" />
        {/* Overlay branding text — visible on desktop only */}
        <div className="absolute inset-0 hidden md:flex flex-col justify-end p-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-5 max-w-sm">
            <p className="text-white font-bold text-lg leading-snug">
              Streamline your hospital.<br />Empower your team.
            </p>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              MediSync brings beds, patients, and staff coordination into one real-time dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* ── LEFT: Form panel ─────────────────────────────────────── */}
      <div className="w-full md:w-[45%] flex flex-col bg-gradient-to-b from-blue-50 via-sky-50/60 to-white min-h-screen md:min-h-0">

        {/* Top-left logo bar */}
        <div className="px-8 py-5 flex items-center gap-3">
          <img
            src={logo}
            alt="MediSync logo"
            className="w-9 h-9 rounded-xl object-cover shadow-sm border border-white"
          />
          <span className="text-lg font-extrabold tracking-tight text-slate-800">
            Medi<span className="text-blue-600">sync</span>
          </span>
        </div>

        {/* Centered form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[400px]">

            {/* Page heading */}
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-800 leading-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
              )}
            </div>

            {/* White form card */}
            <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.07)] border border-slate-100/80 px-7 py-8">
              {children}
            </div>

            {/* Subtle footer */}
            <p className="text-center text-[11px] text-slate-400 mt-6">
              © {new Date().getFullYear()} MediSync · Hospital Management System
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
