import { useState, useEffect, useCallback } from 'react'
import ReceptionSidebar from '../components/reception/ReceptionSidebar'
import ReceptionNavbar from '../components/reception/ReceptionNavbar'
import QueueTable from '../components/reception/QueueTable'
import api from '../services/api'

export default function ReceptionQueue() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPatients = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/patients')
      setPatients(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPatients() }, [fetchPatients])

  const waiting = patients.filter((p) => p.status === 'waiting')

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <ReceptionSidebar />
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        <ReceptionNavbar title="Waiting Queue" />
        <main className="flex-1 overflow-y-auto px-8 py-8 pt-24">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Waiting Queue</h2>
              <p className="text-sm text-slate-400 mt-1">
                {loading ? 'Loading…' : `${waiting.length} patient${waiting.length !== 1 ? 's' : ''} waiting · Emergency patients are at the top`}
              </p>
            </div>
            <button
              type="button"
              onClick={fetchPatients}
              className="text-xs font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
            >
              ↻ Refresh
            </button>
          </div>

          <QueueTable patients={patients} loading={loading} />
        </main>
      </div>
    </div>
  )
}
