import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router'
import { IconSun, IconMoon } from '@tabler/icons-react'
import HomePage from '@/pages/HomePage'
import SpacesPage from '@/pages/SpacesPage'
import BookingsPage from '@/pages/BookingsPage'
import './App.css'
import LoginPage from './pages/LoginPage'
import { BottomMenu } from './components/BottomMenu'
import SpacePage from './pages/SpacePage'
import AdminPage from './pages/AdminPage'
import AdminSpacesPage from './pages/AdminSpacesPage'
import AdminBookingsPage from './pages/AdminBookingsPage'
import { Toaster } from '@/components/ui/sonner'
import AdminUsersPage from './pages/AdminUsersPage'

function AdminRoute({ children }: { children: React.ReactNode }) {
  const role = localStorage.getItem('role')
  if (role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

function AppShell() {
  const [dark, setDark] = useState(false)
  useLocation()

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle('dark')
  }

  const userIsAdmin = localStorage.getItem("role") === "admin"

  return (
    <div className="flex flex-col h-svh overflow-hidden bg-background">
      <button
        id="btn-dark-toggle"
        type="button"
        onClick={toggleDark}
        aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        style={{
          position: 'fixed',
          top: 12,
          right: 12,
          zIndex: 100,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: dark ? '#E8F2FA' : '#1A5C8A',
          padding: 8,
          borderRadius: 8,
          minHeight: 48,
          minWidth: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {dark ? <IconSun size={22} /> : <IconMoon size={22} />}
      </button>

      <main id="main-content" className="h-full flex flex-col">
        <Routes>
          <Route path="/"         element={<LoginPage />} />
          <Route path="/home"    element={<HomePage/>}/>
          <Route path="/spaces"   element={<SpacesPage />} />
          <Route path="/spaces/:id"   element={<SpacePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="/admin/spaces" element={<AdminRoute><AdminSpacesPage /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookingsPage /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
        </Routes>
        <BottomMenu hidden={userIsAdmin}/>
      </main>

    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
      <Toaster position="bottom-center" />
    </BrowserRouter>
  )
}
