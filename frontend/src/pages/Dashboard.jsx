import { FaBed, FaUsers, FaClipboardList, FaCheckCircle } from 'react-icons/fa'

const stats = [
  {
    label: 'Total Beds',
    value: '—',
    sub: 'All wards combined',
    icon: FaBed,
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
  },
  {
    label: 'Available Beds',
    value: '—',
    sub: 'Ready to assign',
    icon: FaCheckCircle,
    color: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-100',
  },
  {
    label: 'Total Patients',
    value: '—',
    sub: 'Currently admitted',
    icon: FaUsers,
    color: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
  },
  {
    label: 'Queue Length',
    value: '—',
    sub: 'Waiting for beds',
    icon: FaClipboardList,
    color: 'bg-amber-50 text-amber-600',
    border: 'border-amber-100',
  },
]

export default function Dashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Welcome to MediSync Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          Manage hospital beds, patients, and queues — all in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color, border }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl p-6 shadow-sm border ${border} flex items-start gap-4`}
          >
            <div className={`p-3 rounded-xl ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-0.5 leading-none">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-base font-semibold text-slate-700 mb-4">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <p className="text-slate-300 text-4xl mb-2">📋</p>
            <p className="text-slate-400 text-sm">No recent activity yet.</p>
            <p className="text-slate-300 text-xs mt-1">Data will appear here once connected to the backend.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-base font-semibold text-slate-700 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Admit Patient', color: 'bg-blue-600 hover:bg-blue-700' },
              { label: 'Assign Bed', color: 'bg-emerald-600 hover:bg-emerald-700' },
              { label: 'View Queue', color: 'bg-violet-600 hover:bg-violet-700' },
            ].map(({ label, color }) => (
              <button
                key={label}
                type="button"
                className={`w-full text-sm font-medium text-white ${color} transition-colors duration-150 py-2.5 rounded-xl`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
        <p className="text-blue-500 text-sm font-medium">
          🔗 Connect the backend API to populate live data across all sections.
        </p>
      </div>
    </div>
  )
}
