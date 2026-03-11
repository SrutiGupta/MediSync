import { useState, useEffect, useCallback } from 'react'
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
import PatientsOverviewTable from '../components/admin/PatientsOverviewTable'
import AddBedModal from '../components/admin/AddBedModal'
import api from '../services/api'
import socket from '../socket/socket'

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
  const [beds, setBeds] = useState([])
  const [patients, setPatients] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingBeds, setLoadingBeds] = useState(true)
  const [loadingPatients, setLoadingPatients] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  // â”€â”€ Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fetchStats = useCallback(async () => {
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
      setError('Failed to load dashboard stats')
    } finally {
      setLoadingStats(false)
    }
  }, [])

  // â”€â”€ Beds â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fetchBeds = useCallback(async () => {
    setLoadingBeds(true)
    try {
      const { data } = await api.get('/beds')
      setBeds(data)
    } catch {
      // silently fail â€” error shown in table
    } finally {
      setLoadingBeds(false)
    }
  }, [])

  // â”€â”€ Patients â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fetchPatients = useCallback(async () => {
    setLoadingPatients(true)
    try {
      const { data } = await api.get('/patients')
      // Show latest 10
      setPatients([...data].reverse().slice(0, 10))
    } catch {
      // silently fail
    } finally {
      setLoadingPatients(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    fetchBeds()
    fetchPatients()
  }, [fetchStats, fetchBeds, fetchPatients])

  // ── Socket.IO real-time updates ───────────────────────────
  useEffect(() => {
    socket.emit('joinDashboard')

    const refresh = () => {
      fetchStats()
      fetchBeds()
      fetchPatients()
    }

    socket.on('bedAssigned', refresh)
    socket.on('bedReleased', refresh)
    socket.on('dashboardUpdated', refresh)
    socket.on('patientCreated', refresh)

    return () => {
      socket.off('bedAssigned', refresh)
      socket.off('bedReleased', refresh)
      socket.off('dashboardUpdated', refresh)
      socket.off('patientCreated', refresh)
    }
  }, [fetchStats, fetchBeds, fetchPatients])

  // â”€â”€ Bed CRUD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleAddBed = async (formData) => {
    await api.post('/beds', formData)
    fetchBeds()
    fetchStats()
  }

  const handleStatusChange = async (bedId, newStatus) => {
    try {
      await api.put(`/beds/${bedId}`, { status: newStatus })
      setBeds((prev) => prev.map((b) => (b._id === bedId ? { ...b, status: newStatus } : b)))
      fetchStats()
    } catch (err) {
      alert(err?.response?.data?.message ?? 'Failed to update bed status.')
    }
  }

  const handleDelete = async (bedId) => {
    if (!window.confirm('Are you sure you want to delete this bed?')) return
    try {
      await api.delete(`/beds/${bedId}`)
      setBeds((prev) => prev.filter((b) => b._id !== bedId))
      fetchStats()
    } catch (err) {
      alert(err?.response?.data?.message ?? 'Failed to delete bed.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <AdminNavbar />

      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Welcome back, Admin ðŸ‘‹
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Here's a snapshot of your hospital's current status.
            </p>
          </div>

          {/* Error state */}
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
              <span className="text-red-400 text-lg flex-shrink-0">âš ï¸</span>
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            {STAT_CONFIG.map((config) => (
              <StatsCard
                key={config.key}
                {...config}
                value={loadingStats ? 'â€¦' : stats[config.key]}
              />
            ))}
          </div>

          {/* Beds table */}
          <div className="mb-8">
            <BedsTable
              beds={beds}
              loading={loadingBeds}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onAddBed={() => setModalOpen(true)}
            />
          </div>

          {/* Patients overview */}
          <PatientsOverviewTable patients={patients} loading={loadingPatients} />
        </div>
      </main>

      <AddBedModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddBed}
      />
    </div>
  )
}
