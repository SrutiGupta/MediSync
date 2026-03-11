const PRIORITY_BADGE = {
  emergency: 'bg-red-100 text-red-700',
  serious: 'bg-amber-100 text-amber-700',
  normal: 'bg-blue-100 text-blue-700',
}

const STATUS_BADGE = {
  waiting: 'bg-blue-100 text-blue-700',
  admitted: 'bg-violet-100 text-violet-700',
  discharged: 'bg-slate-100 text-slate-500',
}

const STATUS_DOT = {
  waiting: 'bg-blue-500',
  admitted: 'bg-violet-500',
  discharged: 'bg-slate-400',
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function ReceptionPatientsTable({ patients, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">All Patients</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {loading ? 'Loading…' : `${patients.length} patient${patients.length !== 1 ? 's' : ''} on record`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="px-6 py-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Loading patients…
        </div>
      )}

      {!loading && patients.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-3xl mb-2">🧑‍⚕️</p>
          <p className="text-slate-500 text-sm font-medium">No patients found</p>
        </div>
      )}

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
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/70 transition-colors duration-100">
                  {/* Patient */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                        {p.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{p.gender ?? ''}</p>
                      </div>
                    </div>
                  </td>

                  {/* Age */}
                  <td className="px-6 py-3.5 text-slate-600">{p.age ?? '—'}</td>

                  {/* Condition */}
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${PRIORITY_BADGE[p.priority] ?? 'bg-slate-100 text-slate-500'}`}>
                      {p.priority ?? '—'}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_BADGE[p.status] ?? 'bg-slate-100 text-slate-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status] ?? 'bg-slate-400'}`} />
                      {p.status ?? '—'}
                    </span>
                  </td>

                  {/* Assigned Bed */}
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-600">
                    {p.bedAssigned?.bedNumber ?? <span className="text-slate-300">—</span>}
                  </td>

                  {/* Registered time */}
                  <td className="px-6 py-3.5 text-xs text-slate-500">
                    {formatDate(p.arrivalTime ?? p.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && patients.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">Showing {patients.length} patient{patients.length !== 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  )
}
