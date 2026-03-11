import { useState, useEffect, useCallback } from 'react'
import ReceptionSidebar from '../components/reception/ReceptionSidebar'
import ReceptionNavbar from '../components/reception/ReceptionNavbar'
import ReceptionPatientsTable from '../components/reception/PatientsTable'
import api from '../services/api'

export default function ReceptionPatients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchPatients = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/patients')
      // Sort: emergency first, then serious, then normal; within group newest first
      const ORDER = { emergency: 0, serious: 1, normal: 2 }
      data.sort((a, b) => (ORDER[a.priority] ?? 9) - (ORDER[b.priority] ?? 9))
      setPatients(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPatients() }, [fetchPatients])

  const counts = {
    all: patients.length,
    waiting: patients.filter((p) => p.status === 'waiting').length,
    admitted: patients.filter((p) => p.status === 'admitted').length,
    discharged: patients.filter((p) => p.status === 'discharged').length,
  }

  const filtered = filter === 'all' ? patients : patients.filter((p) => p.status === filter)

  const FILTERS = [
    { key: 'all', label: 'All', active: 'bg-slate-700 text-white', inactive: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
    { key: 'waiting', label: 'Waiting', active: 'bg-blue-600 text-white', inactive: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
    { key: 'admitted', label: 'Admitted', active: 'bg-violet-600 text-white', inactive: 'bg-violet-50 text-violet-600 hover:bg-violet-100' },
    { key: 'discharged', label: 'Discharged', active: 'bg-slate-500 text-white', inactive: 'bg-slate-100 text-slate-500 hover:bg-slate-200' },
  ]

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <ReceptionSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <ReceptionNavbar title="Patient Records" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Patient Records</h2>
            <p className="text-sm text-slate-400 mt-1">Full list of all registered patients.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {FILTERS.map(({ key, label, active, inactive }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === key ? active : inactive}`}
              >
                {label}
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${filter === key ? 'bg-white/20 text-white' : 'bg-white/70 text-slate-600'}`}>
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          <ReceptionPatientsTable patients={filtered} loading={loading} />
        </main>
      </div>
    </div>
  )
}
