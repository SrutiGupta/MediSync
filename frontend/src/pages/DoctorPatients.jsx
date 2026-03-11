import { useState, useEffect, useCallback } from 'react'
import DoctorSidebar from '../components/doctor/DoctorSidebar'
import DoctorNavbar from '../components/doctor/DoctorNavbar'
import DoctorPatientsTable from '../components/doctor/DoctorPatientsTable'
import api from '../services/api'

export default function DoctorPatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all | waiting | admitted | discharged

  const fetchPatients = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/patients')
      setPatients(data)
    } catch {
      setError('Failed to load patients.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  const filtered =
    filter === 'all' ? patients : patients.filter((p) => p.status === filter)

  const counts = {
    all: patients.length,
    waiting: patients.filter((p) => p.status === 'waiting').length,
    admitted: patients.filter((p) => p.status === 'admitted').length,
    discharged: patients.filter((p) => p.status === 'discharged').length,
  }

  const FILTERS = [
    { key: 'all', label: 'All', color: 'bg-slate-700 text-white', inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
    { key: 'waiting', label: 'Waiting', color: 'bg-blue-600 text-white', inactive: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { key: 'admitted', label: 'Admitted', color: 'bg-violet-600 text-white', inactive: 'bg-violet-50 text-violet-600 hover:bg-violet-100' },
    { key: 'discharged', label: 'Discharged', color: 'bg-slate-500 text-white', inactive: 'bg-slate-100 text-slate-500 hover:bg-slate-200' },
  ]

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <DoctorNavbar title="Patient Management" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">All Patients</h2>
            <p className="text-sm text-slate-400 mt-1">
              Assign beds to waiting patients and discharge admitted ones.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {FILTERS.map(({ key, label, color, inactive }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  filter === key ? color : inactive
                }`}
              >
                {label}
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  filter === key ? 'bg-white/20 text-white' : 'bg-white/70 text-slate-600'
                }`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <DoctorPatientsTable
            patients={filtered}
            loading={loading}
            onRefresh={fetchPatients}
          />
        </main>
      </div>
    </div>
  )
}
