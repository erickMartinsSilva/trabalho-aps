import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { IconSun, IconMoon } from '@tabler/icons-react'
import HomePage from '@/pages/HomePage'
import SpacesPage from '@/pages/SpacesPage'
import BookingsPage from '@/pages/BookingsPage'
import ProfilePage from '@/pages/ProfilePage'
import './App.css'
import LoginPage from './pages/LoginPage'
import { BottomMenu } from './components/BottomMenu'

function AppShell() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
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

      <main id="main-content" className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/spaces"   element={<SpacesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile"  element={<ProfilePage />} />
          <Route path="/login"    element={<LoginPage/>}/>
        </Routes>
      </main>

      <BottomMenu/>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
