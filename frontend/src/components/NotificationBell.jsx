import { useState, useEffect, useRef } from 'react'
import { FaBell } from 'react-icons/fa'
import socket from '../socket/socket'

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const TYPE_STYLES = {
  success: { dot: 'bg-emerald-500', bar: 'border-l-emerald-500' },
  warning: { dot: 'bg-amber-500',   bar: 'border-l-amber-500' },
  error:   { dot: 'bg-red-500',     bar: 'border-l-red-500' },
  info:    { dot: 'bg-blue-500',    bar: 'border-l-blue-500' },
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const [readAt, setReadAt] = useState(Date.now())
  const dropdownRef = useRef(null)

  const push = (message, type = 'info') => {
    setNotifications((prev) =>
      [{ id: Date.now() + Math.random(), message, type, time: new Date() }, ...prev].slice(0, 20)
    )
  }

  // Socket listeners
  useEffect(() => {
    socket.emit('joinDashboard')

    const onPatientCreated = (patient) => {
      const name = patient?.name || 'Unknown'
      const priority = patient?.priority || 'normal'
      const type = priority === 'emergency' ? 'error' : priority === 'serious' ? 'warning' : 'info'
      push(`New patient registered: ${name} (${priority})`, type)
    }

    const onBedAssigned = (data) => {
      const patientName = data?.patientName || 'a patient'
      const bedLabel = data?.bedNumber ? `Bed ${data.bedNumber}` : 'a bed'
      push(`Doctor assigned ${bedLabel} to ${patientName}`, 'success')
    }

    const onPatientDischarged = (data) => {
      const name = data?.patientName || 'A patient'
      const bedLabel = data?.bedNumber ? ` · Bed ${data.bedNumber} released` : ''
      push(`${name} has been discharged${bedLabel}`, 'info')
    }

    const onBedCreated = (data) => {
      const bedLabel = data?.bedNumber ? `Bed ${data.bedNumber}` : 'New bed'
      const wardLabel = data?.ward ? ` (${data.ward})` : ''
      push(`Admin created ${bedLabel}${wardLabel}`, 'success')
    }

    const onBedReleased = () => {
      // If patientDischarged fires this is a duplicate — only show if patientDischarged NOT received
    }

    const onBedDeleted = (data) => {
      const bedLabel = data?.bedNumber ? `Bed ${data.bedNumber}` : 'A bed'
      push(`${bedLabel} was removed by admin`, 'warning')
    }

    socket.on('patientCreated', onPatientCreated)
    socket.on('bedAssigned', onBedAssigned)
    socket.on('patientDischarged', onPatientDischarged)
    socket.on('bedCreated', onBedCreated)
    socket.on('bedDeleted', onBedDeleted)
    // bedReleased not used here; patientDischarged covers the UX

    return () => {
      socket.off('patientCreated', onPatientCreated)
      socket.off('bedAssigned', onBedAssigned)
      socket.off('patientDischarged', onPatientDischarged)
      socket.off('bedCreated', onBedCreated)
      socket.off('bedDeleted', onBedDeleted)
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const unreadCount = notifications.filter((n) => new Date(n.time) > new Date(readAt)).length

  const handleToggle = () => {
    setOpen((prev) => !prev)
    if (!open) setReadAt(Date.now())
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        aria-label="Notifications"
      >
        <FaBell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FaBell className="w-3.5 h-3.5 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-700">Notifications</h3>
              {notifications.length > 0 && (
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="text-[11px] text-slate-400 hover:text-red-500 transition-colors font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-50">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <FaBell className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm font-medium">No notifications yet</p>
                <p className="text-xs mt-1 opacity-70">Activities will appear here in real-time</p>
              </div>
            ) : (
              notifications.slice(0, 10).map((n) => {
                const style = TYPE_STYLES[n.type] || TYPE_STYLES.info
                return (
                  <div
                    key={n.id}
                    className={`px-4 py-3 hover:bg-slate-50 transition-colors border-l-2 ${style.bar}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">{n.message}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{timeAgo(n.time)}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 10 && (
            <div className="px-4 py-2 text-center text-[11px] text-slate-400 border-t border-slate-100 bg-slate-50">
              Showing 10 of {notifications.length} notifications
            </div>
          )}
        </div>
      )}
    </div>
  )
}
