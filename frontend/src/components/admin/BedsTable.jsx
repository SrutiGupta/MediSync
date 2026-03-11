const STATUS_STYLES = {
  available: 'bg-emerald-100 text-emerald-700',
  occupied: 'bg-red-100 text-red-700',
  maintenance: 'bg-amber-100 text-amber-700',
}

const dummyBeds = [
  { id: 'BED-001', ward: 'General Ward A', status: 'occupied', patient: 'John Doe' },
  { id: 'BED-002', ward: 'General Ward A', status: 'available', patient: '—' },
  { id: 'BED-003', ward: 'ICU', status: 'occupied', patient: 'Priya Sharma' },
  { id: 'BED-004', ward: 'ICU', status: 'available', patient: '—' },
  { id: 'BED-005', ward: 'Cardiology', status: 'maintenance', patient: '—' },
  { id: 'BED-006', ward: 'Cardiology', status: 'occupied', patient: 'Ravi Kumar' },
  { id: 'BED-007', ward: 'Pediatrics', status: 'available', patient: '—' },
  { id: 'BED-008', ward: 'Orthopedics', status: 'occupied', patient: 'Anita Singh' },
]

export default function BedsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Beds Overview</h2>
          <p className="text-xs text-slate-400 mt-0.5">All wards — current occupancy status</p>
        </div>
        <button
          type="button"
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          + Add Bed
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                Bed ID
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                Ward
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                Assigned Patient
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {dummyBeds.map((bed) => (
              <tr
                key={bed.id}
                className="hover:bg-slate-50/70 transition-colors duration-100"
              >
                <td className="px-6 py-3.5 font-mono text-xs font-semibold text-slate-600">
                  {bed.id}
                </td>
                <td className="px-6 py-3.5 text-slate-700 font-medium">{bed.ward}</td>
                <td className="px-6 py-3.5">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                      STATUS_STYLES[bed.status] ?? 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        bed.status === 'available'
                          ? 'bg-emerald-500'
                          : bed.status === 'occupied'
                          ? 'bg-red-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    {bed.status}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-slate-600">
                  {bed.patient === '—' ? (
                    <span className="text-slate-300">—</span>
                  ) : (
                    bed.patient
                  )}
                </td>
                <td className="px-6 py-3.5">
                  <div
className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      View
                    </button>
                    <span className="text-slate-200">|</span>
                    <button
                      type="button"
                      className="text-xs font-medium text-slate-500 hover:text-slate-700 hover:underline transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Showing {dummyBeds.length} beds &mdash; dummy data
        </p>
        <p className="text-xs text-slate-400">Connect backend API to load live data</p>
      </div>
    </div>
  )
}