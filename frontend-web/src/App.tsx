import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { IconSun, IconMoon } from '@tabler/icons-react'
import DailyBooksPage from '@/pages/DailyBooksPage'
import WeeklyBooksPage from '@/pages/WeeklyBooksPage' // Nova Importação
import FutureBookingPage from '@/pages/FutureBooksPage'
import { Sidebar } from './components/SideBar'
import './App.css'

function AppShell() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="flex h-svh w-full overflow-hidden bg-[#F7F6F3]">
      <Sidebar />

      <main id="main-content" className="flex-1 relative h-full flex flex-col overflow-hidden">
        <button
          id="btn-dark-toggle"
          type="button"
          onClick={toggleDark}
          aria-label={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
          className="absolute top-6 right-6 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-[#ECEAE4] text-[#1A5C8A] hover:bg-[#E8F2FA] transition-colors"
        >
          {dark ? <IconSun size={22} /> : <IconMoon size={22} />}
        </button>

        <Routes>
          <Route path="/" element={<Navigate to="/painel" replace />} />
          <Route path="/painel" element={<DailyBooksPage />} />
          <Route path="/semana" element={<WeeklyBooksPage />} /> {/* Nova Rota */}
          <Route path="/agendamento" element={<FutureBookingPage />} />
        </Routes>
      </main>
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