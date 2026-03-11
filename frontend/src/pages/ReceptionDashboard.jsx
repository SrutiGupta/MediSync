import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FaUsers, FaClock, FaUserCheck, FaUserMinus } from 'react-icons/fa'
import ReceptionSidebar from '../components/reception/ReceptionSidebar'
import ReceptionNavbar from '../components/reception/ReceptionNavbar'
import QueueTable from '../components/reception/QueueTable'
import api from '../services/api'

const STAT_CONFIG = [
  { key: 'totalPatients', label: 'Total Patients', icon: FaUsers, gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
  { key: 'waitingPatients', label: 'Waiting', icon: FaClock, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600' },
  { key: 'admittedPatients', label: 'Admitted', icon: FaUserCheck, gradient: 'bg-gradient-to-br from-violet-500 to-violet-600' },
  { key: 'dischargedPatients', label: 'Discharged', icon: FaUserMinus, gradient: 'bg-gradient-to-br from-slate-500 to-slate-600' },
]

function StatCard({ label, icon: Icon, gradient, value }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-sm ${gradient}`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-6 w-20 h-20 rounded-full bg-white/10" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-3xl font-bold">{value ?? '…'}</p>
        <p className="text-sm font-medium opacity-80 mt-1">{label}</p>
      </div>
    </div>
  )
}

export default function ReceptionDashboard() {
  const [stats, setStats] = useState({})
  const [patients, setPatients] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingPatients, setLoadingPatients] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/dashboard/stats')
      setStats(data)
    } catch {
      // silently fail — stats are non-critical
    } finally {
      setLoadingStats(false)
    }
  }, [])

  const fetchPatients = useCallback(async () => {
    setLoadingPatients(true)
    try {
      const { data } = await api.get('/patients')
      setPatients(data)
    } catch {
      // silently fail
    } finally {
      setLoadingPatients(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    fetchPatients()
  }, [fetchStats, fetchPatients])

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <ReceptionSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <ReceptionNavbar title="Dashboard Overview" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          {/* Heading */}
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Welcome, Receptionist 👋</h2>
              <p className="text-sm text-slate-400 mt-1">Register patients and monitor the waiting queue.</p>
            </div>
            <Link
              to="/reception/add-patient"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              + Register Patient
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STAT_CONFIG.map((cfg) => (
              <StatCard
                key={cfg.key}
                {...cfg}
                value={loadingStats ? '…' : (stats[cfg.key] ?? 0)}
              />
            ))}
          </div>

          {/* Queue */}
          <QueueTable patients={patients} loading={loadingPatients} />
        </main>
      </div>
    </div>
  )
}
