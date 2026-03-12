import { useState } from 'react'
import AssignBedModal from './AssignBedModal'

const PRIORITY_BADGE = {
  emergency: 'bg-red-100 text-red-700',
  serious: 'bg-amber-100 text-amber-700',
  normal: 'bg-emerald-100 text-emerald-700',
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

export default function DoctorPatientsTable({ patients, loading, onRefresh }) {
  const [assignTarget, setAssignTarget] = useState(null) // patient object

  const handleDischarge = async (patient) => {
    const bedId = patient.bedAssigned?._id ?? patient.bedAssigned
    if (!bedId) {
      alert('Patient has no assigned bed to release.')
      return
    }
    if (!window.confirm(`Discharge ${patient.name}? This will release their bed.`)) return

    try {
      const { default: api } = await import('../../services/api')
      await api.post('/beds/release', { bedId })
      onRefresh()
    } catch (err) {
      alert(err?.response?.data?.message ?? 'Failed to discharge patient.')
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Patient Management</h2>
            <p className="text-xs text-slate-800 mt-0.5">
              {loading ? 'Loading…' : `${patients.length} patient${patients.length !== 1 ? 's' : ''} in record`}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="px-6 py-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
            <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
            Loading patients…
          </div>
        )}

        {/* Empty */}
        {!loading && patients.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-3xl mb-2">🧑‍⚕️</p>
            <p className="text-slate-500 text-sm font-medium">No patients found</p>
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
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-slate-50/70 transition-colors duration-100">
                    {/* Patient name */}
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs flex-shrink-0">
                          {patient.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{patient.name}</p>
                          <p className="text-xs text-slate-400 capitalize">{patient.gender ?? ''}</p>
                        </div>
                      </div>
                    </td>

                    {/* Age */}
                    <td className="px-6 py-3.5 text-slate-600">{patient.age ?? '—'}</td>

                    {/* Condition / priority */}
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                        PRIORITY_BADGE[patient.priority] ?? 'bg-slate-100 text-slate-500'
                      }`}>
                        {patient.priority ?? '—'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                        STATUS_BADGE[patient.status] ?? 'bg-slate-100 text-slate-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[patient.status] ?? 'bg-slate-400'}`} />
                        {patient.status ?? '—'}
                      </span>
                    </td>

                    {/* Assigned bed */}
                    <td className="px-6 py-3.5 text-slate-700 font-bold text-xs">
                      {patient.bedAssigned?.bedNumber ?? (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        {patient.status === 'waiting' && (
                          <button
                            type="button"
                            onClick={() => setAssignTarget(patient)}
                            className="text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Assign Bed
                          </button>
                        )}
                        {patient.status === 'admitted' && (
                          <button
                            type="button"
                            onClick={() => handleDischarge(patient)}
                            className="text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Discharge
                          </button>
                        )}
                        {patient.status === 'discharged' && (
                          <span className="text-xs text-slate-700 italic">Discharged</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && patients.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-100">
          </div>
        )}
      </div>

      {/* Assign Bed Modal */}
      <AssignBedModal
        open={!!assignTarget}
        patient={assignTarget}
        onClose={() => setAssignTarget(null)}
        onAssigned={() => {
          setAssignTarget(null)
          onRefresh()
        }}
      />
    </>
  )
}
