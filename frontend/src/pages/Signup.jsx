import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import AuthLayout from '../layouts/AuthLayout'

const ROLES = [
  { label: 'Admin', value: 'admin' },
  { label: 'Receptionist', value: 'receptionist' },
  { label: 'Doctor', value: 'doctor' },
]

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await api.post('/auth/signup', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      })

      navigate('/login', { replace: true })
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.response?.data?.error ?? 'Registration failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join MediSync and start managing your hospital"
    >
      {/* Error banner */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Dr. Jane Smith"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email 
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@hospital.com"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none"
          >
            <option value="" disabled>
              Select a role…
            </option>
            {ROLES.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 shadow-md mt-1"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
