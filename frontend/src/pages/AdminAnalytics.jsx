import { useState, useEffect } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNavbar from '../components/admin/AdminNavbar'
import {
  PatientDistributionChart,
  BedUsageChart,
  AdmissionTrendChart,
} from '../components/admin/Charts'
import api from '../services/api'

function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-sm ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )
}

export default function AdminAnalytics() {
  const [patients, setPatients] = useState([])
  const [beds, setBeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, bRes] = await Promise.all([
          api.get('/patients'),
          api.get('/beds'),
        ])
        setPatients(pRes.data || [])
        setBeds(bRes.data || [])
      } catch {
        setError('Failed to load analytics data.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Derive chart data from fetched records
  const priorityData = {
    emergency: patients.filter((p) => p.priority === 'emergency').length,
    serious: patients.filter((p) => p.priority === 'serious').length,
    normal: patients.filter((p) => p.priority === 'normal').length,
  }

  const bedData = {
    available: beds.filter((b) => b.status === 'available').length,
    occupied: beds.filter((b) => b.status === 'occupied').length,
    maintenance: beds.filter((b) => b.status === 'maintenance').length,
  }

  // Build admission trend: group admitted patients by date (last 14 days)
  const trendData = (() => {
    const counts = {}
    patients
      .filter((p) => p.admittedAt)
      .forEach((p) => {
        const d = new Date(p.admittedAt)
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        counts[key] = (counts[key] || 0) + 1
      })
    return Object.entries(counts)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .slice(-14)
      .map(([date, admissions]) => ({ date, admissions }))
  })()

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <AdminNavbar title="Analytics" />
        <main className="flex-1 overflow-y-auto px-8 py-8">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-800">Analytics Overview</h2>
            <p className="text-sm text-slate-400 mt-1">Live statistics derived from current patient & bed data</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <SummaryCard label="Total Patients" value={loading ? '…' : patients.length} color="bg-gradient-to-br from-blue-500 to-blue-600" />
            <SummaryCard label="Emergency" value={loading ? '…' : priorityData.emergency} color="bg-gradient-to-br from-red-500 to-red-600" />
            <SummaryCard label="Serious" value={loading ? '…' : priorityData.serious} color="bg-gradient-to-br from-amber-500 to-amber-600" />
            <SummaryCard label="Available Beds" value={loading ? '…' : bedData.available} color="bg-gradient-to-br from-emerald-500 to-emerald-600" />
            <SummaryCard label="Occupied Beds" value={loading ? '…' : bedData.occupied} color="bg-gradient-to-br from-violet-500 to-violet-600" />
            <SummaryCard label="Maintenance" value={loading ? '…' : bedData.maintenance} color="bg-gradient-to-br from-slate-500 to-slate-600" />
          </div>

          {/* Charts — row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PatientDistributionChart data={loading ? {} : priorityData} />
            <BedUsageChart data={loading ? {} : bedData} />
          </div>

          {/* Charts — row 2 */}
          <div className="grid grid-cols-1 gap-6">
            <AdmissionTrendChart data={loading ? [] : trendData} />
          </div>
        </main>
      </div>
    </div>
  )
}
