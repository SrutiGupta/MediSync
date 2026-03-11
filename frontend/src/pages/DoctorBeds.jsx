import { useState, useEffect } from 'react'
import DoctorSidebar from '../components/doctor/DoctorSidebar'
import DoctorNavbar from '../components/doctor/DoctorNavbar'
import api from '../services/api'

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

function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-sm ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}

export default function DoctorBeds() {
  const [beds, setBeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const { data } = await api.get('/beds')
        setBeds(data)
      } catch {
        setError('Failed to load beds.')
      } finally {
        setLoading(false)
      }
    }
    fetchBeds()
  }, [])

  const available = beds.filter((b) => b.status === 'available').length
  const occupied = beds.filter((b) => b.status === 'occupied').length
  const maintenance = beds.filter((b) => b.status === 'maintenance').length

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <DoctorNavbar title="Bed Availability" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-800">Bed Availability</h2>
            <p className="text-sm text-slate-400 mt-1">Read-only view — contact admin to add or remove beds.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Summary cards */}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <SummaryCard label="Available" value={available} color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
              <SummaryCard label="Occupied" value={occupied} color="bg-gradient-to-br from-red-500 to-red-600" />
              <SummaryCard label="Maintenance" value={maintenance} color="bg-gradient-to-br from-amber-400 to-orange-500" />
            </div>
          )}

          {/* Bed table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">All Beds</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {loading ? 'Loading…' : `${beds.length} bed${beds.length !== 1 ? 's' : ''} total`}
              </p>
            </div>

            {loading && (
              <div className="px-6 py-10 flex items-center justify-center gap-3 text-slate-400 text-sm">
                <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                Loading beds…
              </div>
            )}

            {!loading && beds.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-3xl mb-2">🛏️</p>
                <p className="text-slate-500 text-sm font-medium">No beds found</p>
              </div>
            )}

            {!loading && beds.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Bed Number</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Ward</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Status</th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 px-6 py-3">Assigned Patient</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {beds.map((bed) => (
                      <tr key={bed._id} className="hover:bg-slate-50/70 transition-colors duration-100">
                        <td className="px-6 py-3.5 font-mono text-xs font-semibold text-slate-600">
                          {bed.bedNumber}
                        </td>
                        <td className="px-6 py-3.5 text-slate-700 font-medium capitalize">
                          {bed.ward}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                            STATUS_STYLES[bed.status] ?? 'bg-slate-100 text-slate-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[bed.status] ?? 'bg-slate-400'}`} />
                            {bed.status}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-600">
                          {bed.assignedPatient?.name ?? (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && beds.length > 0 && (
              <div className="px-6 py-3 border-t border-slate-100">
                <p className="text-xs text-slate-400">Showing {beds.length} beds</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
