const STATUS_STYLES = {
  available: 'bg-emerald-100 text-emerald-700',
  occupied: 'bg-red-100 text-red-700',
  maintenance: 'bg-amber-100 text-amber-700',
}

const STATUS_DOT = {
  available: 'bg-emerald-500',
  occupied: 'bg-red-500',
  maintenance: 'bg-amber-500',
}

// Admin can only toggle between Available ↔ Maintenance.
// "Occupied" is set automatically by the doctor assign-bed flow.
const ADMIN_STATUSES = ['available', 'maintenance']

export default function BedsTable({ beds = [], loading = false, onStatusChange, onDelete, onAddBed }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Beds Overview</h2>
          <p className="text-xs text-slate-700 mt-0.5">
            {loading ? 'Loading…' : `${beds.length} bed${beds.length !== 1 ? 's' : ''} across all wards`}
          </p>
        </div>
        <button
          type="button"
          onClick={onAddBed}
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          + Add Bed
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="px-6 py-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Loading beds…
        </div>
      )}

      {/* Empty state */}
      {!loading && beds.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-3xl mb-2">🛏️</p>
          <p className="text-slate-500 text-sm font-medium">No beds found</p>
          <p className="text-slate-400 text-xs mt-1">Click "+ Add Bed" to create the first one.</p>
        </div>
      )}

      {/* Table */}
      {!loading && beds.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Bed ID</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Ward</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Assigned Patient</th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {beds.map((bed) => (
                <tr key={bed._id} className="hover:bg-slate-50/70 transition-colors duration-100">
                  {/* Bed Number */}
                  <td className="px-6 py-3.5 text-xs font-semibold text-slate-700">
                    {bed.bedNumber}
                  </td>

                  {/* Ward */}
                  <td className="px-6 py-3.5 text-slate-700 font-medium capitalize">
                    {bed.ward}
                  </td>

                  {/* Status badge */}
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                        STATUS_STYLES[bed.status] ?? 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[bed.status] ?? 'bg-slate-400'}`} />
                      {bed.status}
                    </span>
                  </td>

                  {/* Assigned patient */}
                  <td className="px-6 py-3.5 text-slate-600">
                    {bed.assignedPatient?.name ?? (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* Status selector — occupied beds are locked; admin cannot set Occupied */}
                      {bed.status === 'occupied' ? (
                        <span className="text-xs text-slate-700 italic">patient assigned</span>
                      ) : (
                        <select
                          value={bed.status}
                          onChange={(e) => onStatusChange(bed._id, e.target.value)}
                          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          {ADMIN_STATUSES.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      )}

                      {/* Delete — always available to admin */}
                      <button
                        type="button"
                        onClick={() => onDelete(bed._id)}
                        className="text-xs font-medium text-red-500 hover:text-red-700 hover:underline transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      {!loading && beds.length > 0 && (
        <div className="px-6 py-3 border-t border-slate-100">
        </div>
      )}
    </div>
  )
}
