const PRIORITY_ORDER = { emergency: 0, serious: 1, normal: 2 }

const PRIORITY_ROW = {
  emergency: 'bg-red-50 border-l-4 border-l-red-500',
  serious: 'bg-amber-50 border-l-4 border-l-amber-400',
  normal: '',
}

const PRIORITY_BADGE = {
  emergency: 'bg-red-100 text-red-700',
  serious: 'bg-amber-100 text-amber-700',
  normal: 'bg-blue-100 text-blue-700',
}

const PRIORITY_ICON = {
  emergency: '🔴',
  serious: '🟠',
  normal: '🔵',
}

function formatArrival(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  }) + ', ' + new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short',
  })
}

export default function QueueTable({ patients, loading }) {
  // Filter only waiting + sort by priority
  const queue = [...(patients ?? [])]
    .filter((p) => p.status === 'waiting')
    .sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Waiting Queue</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {loading ? 'Loading…' : `${queue.length} patient${queue.length !== 1 ? 's' : ''} waiting · sorted by priority`}
          </p>
        </div>
        {queue.some((p) => p.priority === 'emergency') && (
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
            🚨 Emergency patients present
          </span>
        )}
      </div>

      {loading && (
        <div className="px-6 py-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Loading queue…
        </div>
      )}

      {!loading && queue.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-slate-500 text-sm font-medium">Queue is empty</p>
          <p className="text-slate-400 text-xs mt-1">No patients are currently waiting.</p>
        </div>
      )}

      {!loading && queue.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">#</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Patient</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Condition</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Disease / Symptoms</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Arrival Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {queue.map((p, idx) => (
                <tr
                  key={p._id}
                  className={`transition-colors duration-100 ${PRIORITY_ROW[p.priority] ?? 'hover:bg-slate-50/70'}`}
                >
                  {/* Position */}
                  <td className="px-6 py-3.5">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </td>

                  {/* Patient */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                        {p.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.age ? `${p.age} yrs` : ''} · {p.gender ?? ''}</p>
                      </div>
                    </div>
                  </td>

                  {/* Condition */}
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${PRIORITY_BADGE[p.priority] ?? 'bg-slate-100 text-slate-500'}`}>
                      <span>{PRIORITY_ICON[p.priority]}</span>
                      {p.priority ?? '—'}
                    </span>
                  </td>

                  {/* Disease */}
                  <td className="px-6 py-3.5 text-slate-600 max-w-xs">
                    <p className="truncate">{p.disease ?? '—'}</p>
                  </td>

                  {/* Arrival time */}
                  <td className="px-6 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                    {formatArrival(p.arrivalTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && queue.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">{queue.length} patient{queue.length !== 1 ? 's' : ''} in queue</p>
        </div>
      )}
    </div>
  )
}
