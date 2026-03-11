import { useState, useEffect, useCallback } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNavbar from '../components/admin/AdminNavbar'
import BedsTable from '../components/admin/BedsTable'
import AddBedModal from '../components/admin/AddBedModal'
import api from '../services/api'

export default function AdminBeds() {
  const [beds, setBeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  // ── Fetch all beds ──────────────────────────────────────────
  const fetchBeds = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.get('/beds')
      setBeds(data)
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Failed to load beds.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBeds()
  }, [fetchBeds])

  // ── Create bed ──────────────────────────────────────────────
  const handleAddBed = async (formData) => {
    await api.post('/beds', {
      bedNumber: formData.bedNumber,
      ward: formData.ward,
      status: formData.status,
    })
    fetchBeds()
  }

  // ── Update status ───────────────────────────────────────────
  const handleStatusChange = async (bedId, newStatus) => {
    try {
      await api.put(`/beds/${bedId}`, { status: newStatus })
      setBeds((prev) =>
        prev.map((b) => (b._id === bedId ? { ...b, status: newStatus } : b))
      )
    } catch (err) {
      alert(err?.response?.data?.message ?? 'Failed to update bed status.')
    }
  }

  // ── Delete bed ──────────────────────────────────────────────
  const handleDelete = async (bedId) => {
    if (!window.confirm('Are you sure you want to delete this bed?')) return
    try {
      await api.delete(`/beds/${bedId}`)
      setBeds((prev) => prev.filter((b) => b._id !== bedId))
    } catch (err) {
      alert(err?.response?.data?.message ?? 'Failed to delete bed.')
    }
  }

  // ── Summary counts ──────────────────────────────────────────
  const available = beds.filter((b) => b.status === 'available').length
  const occupied = beds.filter((b) => b.status === 'occupied').length
  const maintenance = beds.filter((b) => b.status === 'maintenance').length

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <AdminNavbar />

      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">
          {/* Page header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                Bed Management
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                Create, monitor and update all hospital beds.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-all duration-150 active:scale-95"
            >
              + Add Bed
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <SummaryCard label="Available" count={available} color="emerald" />
            <SummaryCard label="Occupied" count={occupied} color="red" />
            <SummaryCard label="Maintenance" count={maintenance} color="amber" />
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-5 py-4 flex items-start gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Beds table */}
          <BedsTable
            beds={beds}
            loading={loading}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onAddBed={() => setModalOpen(true)}
          />
        </div>
      </main>

      {/* Add Bed Modal */}
      <AddBedModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddBed}
      />
    </div>
  )
}

function SummaryCard({ label, count, color }) {
  const colors = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    red: 'bg-red-50 border-red-100 text-red-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
  }
  const numColors = {
    emerald: 'text-emerald-600',
    red: 'text-red-600',
    amber: 'text-amber-600',
  }
  return (
    <div className={`rounded-2xl border px-6 py-5 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className={`text-4xl font-extrabold mt-1 ${numColors[color]}`}>{count}</p>
      <p className="text-xs opacity-60 mt-1">beds</p>
    </div>
  )
}
