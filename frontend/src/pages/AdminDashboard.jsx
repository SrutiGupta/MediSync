import { useState, useEffect } from 'react'
import {
  FaUsers,
  FaUserCheck,
  FaClock,
  FaBed,
  FaProcedures,
} from 'react-icons/fa'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNavbar from '../components/admin/AdminNavbar'
import StatsCard from '../components/admin/StatsCard'
import BedsTable from '../components/admin/BedsTable'
import api from '../services/api'

const STAT_CONFIG = [
  {
    key: 'totalPatients',
    title: 'Total Patients',
    icon: FaUsers,
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    trend: 'All time',
  },
  {
    key: 'admittedPatients',
    title: 'Admitted Patients',
    icon: FaUserCheck,
    gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    trend: 'Active',
  },
  {
    key: 'waitingPatients',
    title: 'Waiting Patients',
    icon: FaClock,
    gradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    trend: 'In queue',
  },
  {
    key: 'availableBeds',
    title: 'Available Beds',
    icon: FaBed,
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    trend: 'Ready',
  },
  {
    key: 'occupiedBeds',
    title: 'Occupied Beds',
    icon: FaProcedures,
    gradient: 'bg-gradient-to-br from-rose-500 to-red-600',
    iconBg: 'bg-white/20',
    iconColor: 'text-white',
    trend: 'In use',
  },
]

const DEFAULT_STATS = {
  totalPatients: 0,
  admittedPatients: 0,
  waitingPatients: 0,
  availableBeds: 0,
  occupiedBeds: 0,
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(DEFAULT_STATS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats')
        setStats({
          totalPatients: data.totalPatients ?? 0,
          admittedPatients: data.admittedPatients ?? 0,
          waitingPatients: data.waitingPatients ?? 0,
          availableBeds: data.availableBeds ?? 0,
          occupiedBeds: data.occupiedBeds ?? 0,
        })
      } catch {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <AdminNavbar />

      {/* Main content — offset for sidebar (w-64) and navbar (h-16) */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Welcome back, Admin 👋
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Here's a snapshot of your hospital's current status.
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="mb-6 flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              <p className="text-slate-500 text-sm font-medium">Loading dashboard data...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
              <span className="text-red-400 text-lg flex-shrink-0">⚠️</span>
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            {STAT_CONFIG.map((config) => (
              <StatsCard
                key={config.key}
                {...config}
                value={stats[config.key]}
              />
            ))}
          </div>

          {/* Beds table */}
          <BedsTable />
        </div>
      </main>
    </div>
  )
}