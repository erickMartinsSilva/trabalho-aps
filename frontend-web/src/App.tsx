import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import DailyBooksPage from '@/pages/DailyBooksPage'
import WeeklyBooksPage from '@/pages/WeeklyBooksPage'
import FutureBookingPage from '@/pages/FutureBooksPage'
import { Sidebar } from './components/SideBar'
import { Toaster } from '@/components/ui/sonner'
import './App.css'

function AppShell() {
  return (
    <div className="flex h-svh w-full overflow-hidden bg-[#F7F6F3]">
      <Sidebar />

      <main id="main-content" className="flex-1 relative h-full flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/painel" replace />} />
          <Route path="/painel" element={<DailyBooksPage />} />
          <Route path="/semana" element={<WeeklyBooksPage />} />
          <Route path="/reserva" element={<FutureBookingPage />} />
        </Routes>
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