import heroImage from '../assets/image.jpg'
import logo from '../assets/logo.jpg'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    /* Full-page gradient — one seamless background */
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: 'linear-gradient(135deg, #4f8cff 0%, #6b7cff 50%, #8a5cff 100%)' }}
    >

      {/* ── LEFT: Form panel ─────────────────────────────────────── */}
      <div className="w-full md:w-[45%] flex flex-col order-last md:order-first">

        {/* Top-left logo bar */}
        <div className="px-8 py-5 flex items-start gap-3">
          <img
            src={logo}
            alt="MediSync logo"
            className="w-12 h-12 rounded-xl object-cover shadow-md border border-white/40 flex-shrink-0"
          />
          <div className="leading-tight">
            <p className="text-2xl font-bold text-white drop-shadow">MediSync</p>
            <p className="text-sm text-blue-100">Hospital Management System</p>
          </div>
        </div>

        {/* Centered form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-[400px]">

            {/* Page heading (now lives inside the card via children wrapper) */}

            {/* Glassmorphism form card */}
            <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-2xl px-7 py-8">
              {/* Card title */}
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-indigo-700 leading-tight">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
              {children}
            </div>

            {/* Subtle footer */}
            <p className="text-center text-[11px] text-blue-200 mt-6">
              © {new Date().getFullYear()} MediSync · Hospital Management System
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Hero image ────────────────────────────────────── */}
      <div className="relative w-full h-52 md:h-auto md:w-[55%] order-first md:order-last flex-shrink-0">
        <img
          src={heroImage}
          alt="Hospital"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay — blends image into the page gradient seamlessly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #6b7cff 0%, #6b7cff22 40%, transparent 100%), ' +
              'linear-gradient(to bottom, #4f8cff44 0%, transparent 60%)',
          }}
        />
        {/* Branding quote — desktop only */}
        <div className="absolute inset-0 hidden md:flex flex-col justify-end p-10">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl px-6 py-5 max-w-sm">
            <p className="text-white font-bold text-lg leading-snug">
              Streamline your hospital.<br />Empower your team.
            </p>
            <p className="text-blue-100 text-sm mt-2 leading-relaxed">
              MediSync brings beds, patients, and staff coordination into one real-time dashboard.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
