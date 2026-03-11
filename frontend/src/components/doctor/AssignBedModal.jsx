import { useState, useEffect } from 'react'
import { FaTimes, FaBed } from 'react-icons/fa'
import api from '../../services/api'

export default function AssignBedModal({ open, patient, onClose, onAssigned }) {
  const [beds, setBeds] = useState([])
  const [loading, setLoading] = useState(false)
  const [assigning, setAssigning] = useState(false)
  const [selectedBed, setSelectedBed] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setSelectedBed(null)
    setError('')
    const fetchBeds = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/beds')
        setBeds(data.filter((b) => b.status === 'available'))
      } catch {
        setError('Failed to load available beds.')
      } finally {
        setLoading(false)
      }
    }
    fetchBeds()
  }, [open])

  const handleAssign = async () => {
    if (!selectedBed) return
    setAssigning(true)
    setError('')
    try {
      await api.post('/beds/assign', {
        patientId: patient._id,
        bedId: selectedBed._id,
      })
      onAssigned()
      onClose()
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Failed to assign bed.')
    } finally {
      setAssigning(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-800">Assign Bed</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Patient: <span className="font-semibold text-slate-600">{patient?.name}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-8 gap-3 text-slate-400 text-sm">
              <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              Loading available beds…
            </div>
          ) : beds.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">🛏️</p>
              <p className="text-slate-500 text-sm font-medium">No available beds</p>
              <p className="text-slate-400 text-xs mt-1">All beds are currently occupied or under maintenance.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {beds.length} bed{beds.length !== 1 ? 's' : ''} available — select one
              </p>
              {beds.map((bed) => (
                <button
                  key={bed._id}
                  type="button"
                  onClick={() => setSelectedBed(bed)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border-2 text-left transition-all duration-150 ${
                    selectedBed?._id === bed._id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    selectedBed?._id === bed._id ? 'bg-teal-500' : 'bg-slate-100'
                  }`}>
                    <FaBed className={`w-4 h-4 ${selectedBed?._id === bed._id ? 'text-white' : 'text-slate-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{bed.bedNumber}</p>
                    <p className="text-xs text-slate-400 capitalize">{bed.ward} ward</p>
                  </div>
                  {selectedBed?._id === bed._id && (
                    <span className="ml-auto text-xs font-semibold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAssign}
            disabled={!selectedBed || assigning}
            className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-2"
          >
            {assigning && (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Assign Bed
          </button>
        </div>
      </div>
    </div>
  )
}
