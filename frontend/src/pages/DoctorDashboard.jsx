import { useState, useEffect, useCallback } from 'react'
import { FaUsers, FaUserCheck, FaClock, FaBed } from 'react-icons/fa'
import DoctorSidebar from '../components/doctor/DoctorSidebar'
import DoctorNavbar from '../components/doctor/DoctorNavbar'
import DoctorPatientsTable from '../components/doctor/DoctorPatientsTable'
import api from '../services/api'
import socket from '../socket/socket'

const STAT_CONFIG = [
  {
    key: 'totalPatients',
    title: 'Total Patients',
    icon: FaUsers,
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  {
    key: 'admittedPatients',
    title: 'Admitted',
    icon: FaUserCheck,
    gradient: 'bg-gradient-to-br from-violet-500 to-violet-600',
  },
  {
    key: 'waitingPatients',
    title: 'Waiting',
    icon: FaClock,
    gradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
  },
  {
    key: 'availableBeds',
    title: 'Available Beds',
    icon: FaBed,
    gradient: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
]

function StatCard({ title, icon: Icon, gradient, value }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-sm ${gradient}`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-6 w-20 h-20 rounded-full bg-white/10" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-3xl font-bold">{value ?? '…'}</p>
        <p className="text-sm font-medium opacity-80 mt-1">{title}</p>
      </div>
    </div>
  )
}

export default function DoctorDashboard() {
  const [stats, setStats] = useState({})
  const [patients, setPatients] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [error, setError] = useState('')

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/dashboard/stats')
      setStats(data)
    } catch {
      setError('Failed to load stats.')
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
      setError('Failed to load patients.')
    } finally {
      setLoadingPatients(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    fetchPatients()
  }, [fetchStats, fetchPatients])

  // ── Socket.IO real-time updates ───────────────────────────
  useEffect(() => {
    socket.emit('joinDashboard')

    const refresh = () => {
      fetchStats()
      fetchPatients()
    }

    socket.on('patientCreated', refresh)
    socket.on('bedAssigned', refresh)
    socket.on('bedReleased', refresh)
    socket.on('dashboardUpdated', refresh)

    return () => {
      socket.off('patientCreated', refresh)
      socket.off('bedAssigned', refresh)
      socket.off('bedReleased', refresh)
      socket.off('dashboardUpdated', refresh)
    }
  }, [fetchStats, fetchPatients])

  const handleRefresh = () => {
    fetchStats()
    fetchPatients()
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <DoctorSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <DoctorNavbar title="Dashboard Overview" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          {/* Page heading */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-800">Welcome, Doctor 👨‍⚕️</h2>
            <p className="text-sm text-slate-400 mt-1">Manage patients and bed assignments from here.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3 text-sm">
              {error}
            </div>
          )}

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

          {/* Patient table */}
          <DoctorPatientsTable
            patients={patients}
            loading={loadingPatients}
            onRefresh={handleRefresh}
          />
        </main>
      </div>
    </div>
  )
}
