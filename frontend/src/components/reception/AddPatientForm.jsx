import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const INITIAL = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  disease: '',
  priority: 'normal',
}

const PRIORITY_OPTIONS = [
  { value: 'emergency', label: 'Emergency', color: 'text-red-600' },
  { value: 'serious', label: 'Serious', color: 'text-amber-600' },
  { value: 'normal', label: 'Normal', color: 'text-blue-600' },
]

export default function AddPatientForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await api.post('/patients', {
        name: form.name.trim(),
        age: Number(form.age),
        gender: form.gender,
        phone: form.phone.trim(),
        disease: form.disease.trim(),
        priority: form.priority,
      })
      setSuccess(true)
      setForm(INITIAL)
      // Brief pause so the user sees the success banner, then navigate
      setTimeout(() => navigate('/reception/patients'), 1500)
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Failed to register patient. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Success banner */}
      {success && (
        <div className="mb-6 flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-5 py-3.5 text-sm font-medium">
          <span className="text-lg">✅</span>
          Patient registered successfully! Redirecting…
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3.5 text-sm">
          <span className="text-lg">⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 space-y-5">
        {/* Row 1: Name + Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full name"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              name="age"
              type="number"
              min="0"
              max="150"
              value={form.age}
              onChange={handleChange}
              required
              placeholder="e.g. 35"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Row 2: Gender + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
            >
              <option value="" disabled>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="10-digit number"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Row 3: Disease / Symptoms */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Disease / Symptoms <span className="text-red-500">*</span>
          </label>
          <textarea
            name="disease"
            value={form.disease}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe the patient's symptoms or known disease…"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          />
        </div>

        {/* Row 4: Priority / Condition */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Condition <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {PRIORITY_OPTIONS.map(({ value, label, color }) => (
              <label
                key={value}
                className={`flex-1 flex items-center justify-center gap-2 border-2 rounded-xl px-3 py-3 cursor-pointer transition-all text-sm font-semibold ${
                  form.priority === value
                    ? value === 'emergency'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : value === 'serious'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="priority"
                  value={value}
                  checked={form.priority === value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className={form.priority === value ? '' : 'text-slate-400'}>
                  {value === 'emergency' ? '🔴' : value === 'serious' ? '🟠' : '🔵'}
                </span>
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Registering…' : 'Register Patient'}
          </button>
          <button
            type="button"
            onClick={() => { setForm(INITIAL); setError('') }}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
