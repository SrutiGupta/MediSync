const STATUS_STYLES = {
  waiting: 'bg-blue-100 text-blue-700',
  admitted: 'bg-violet-100 text-violet-700',
  discharged: 'bg-slate-100 text-slate-600',
}

const STATUS_DOT = {
  waiting: 'bg-blue-500',
  admitted: 'bg-violet-500',
  discharged: 'bg-slate-400',
}

const PRIORITY_STYLES = {
  emergency: 'bg-red-100 text-red-700',
  serious: 'bg-amber-100 text-amber-700',
  normal: 'bg-emerald-100 text-emerald-700',
}

function formatTime(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export default function PatientsOverviewTable({ patients = [], loading = false }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Patient Overview</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {loading ? 'Loading…' : `Latest ${patients.length} patient${patients.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
          Recent 10
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="px-6 py-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          Loading patients…
        </div>
      )}

      {/* Empty */}
      {!loading && patients.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-3xl mb-2">🧑‍⚕️</p>
          <p className="text-slate-500 text-sm font-medium">No patients yet</p>
          <p className="text-slate-400 text-xs mt-1">Patients admitted by the receptionist will appear here.</p>
        </div>
      )}

      {/* Table */}
      {!loading && patients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Patient</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Age</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Condition</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Assigned Bed</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/70 transition-colors duration-100">
                  {/* Name */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold uppercase">
                          {p.name?.charAt(0) ?? '?'}
                        </span>
                      </div>
                      <span className="font-medium text-slate-800 text-sm">{p.name}</span>
                    </div>
                  </td>

                  {/* Age */}
                  <td className="px-6 py-3.5 text-slate-600">{p.age ?? '—'}</td>

                  {/* Condition / Priority */}
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${PRIORITY_STYLES[p.priority] ?? 'bg-slate-100 text-slate-600'}`}>
                      {p.priority ?? '—'}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[p.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status] ?? 'bg-slate-400'}`} />
                      {p.status ?? '—'}
                    </span>
                  </td>

                  {/* Assigned bed */}
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-600">
                    {p.bedAssigned?.bedNumber ?? <span className="text-slate-300">—</span>}
                  </td>

                  {/* Created time */}
                  <td className="px-6 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                    {formatTime(p.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
