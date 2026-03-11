import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import AdminBeds from './pages/AdminBeds'
import AdminAnalytics from './pages/AdminAnalytics'
import ReceptionDashboard from './pages/ReceptionDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import DoctorPatients from './pages/DoctorPatients'
import DoctorBeds from './pages/DoctorBeds'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Role-based protected dashboards (no Layout shell) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/beds"
          element={
            <ProtectedRoute>
              <AdminBeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reception/dashboard"
          element={
            <ProtectedRoute>
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute>
              <DoctorPatients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/beds"
          element={
            <ProtectedRoute>
              <DoctorBeds />
            </ProtectedRoute>
          }
        />

        {/* General dashboard inside the Layout shell */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Future routes: /patients, /queue, /beds */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
