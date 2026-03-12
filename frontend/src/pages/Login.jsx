import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import AuthLayout from '../layouts/AuthLayout'

// Keys match User model enum values (lowercase)
const ROLE_REDIRECT = {
  admin: '/admin/dashboard',
  receptionist: '/reception/dashboard',
  doctor: '/doctor/dashboard',
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
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
      const { data } = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      })

      // Persist token and role
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)

      // Role-based redirect
      const destination = ROLE_REDIRECT[data.user.role] ?? '/dashboard'
      navigate(destination, { replace: true })
    } catch (err) {
      const message =
        err.response?.data?.message ?? 'Login failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your MediSync account to continue"
    >
      {/* Error banner */}
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
          <span className="mt-0.5">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-1.5"
          >
            Email address
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
            className="w-full px-4 py-2.5 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition backdrop-blur-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition backdrop-blur-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed text-indigo-600 font-semibold text-sm py-3 rounded-xl transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 shadow-lg mt-1"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-white/80 mt-6">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-white font-bold hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  )
}
