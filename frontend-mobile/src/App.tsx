import React, { useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { StatusBadge } from '@/components/StatusBadge'
import { SpaceCard } from '@/components/SpaceCard'
import { BookingCard } from '@/components/BookingCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  IconSearch,
  IconBell,
  IconSettings,
  IconSun,
  IconMoon,
} from '@tabler/icons-react'
import type { NavTab } from '@/components/BottomNav'
import './App.css'

const SPACES = [
  { id: 1, nome: 'Sala de Reunião A', capacidadeMaxima: 10, status: 'available' as const },
  { id: 2, nome: 'Sala Coletiva B',   capacidadeMaxima: 6,  status: 'occupied'  as const },
  { id: 3, nome: 'Espaço Criativo',   capacidadeMaxima: 4,  status: 'pending'   as const },
  { id: 4, nome: 'Sala de Projetos',  capacidadeMaxima: 8,  status: 'reserved'  as const },
]

const now = new Date()
const BOOKINGS = [
  {
    id: 101,
    dataHoraInicio:  new Date(now.getTime() + 1 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() + 3 * 60 * 60 * 1000),
    espacoNome: 'Sala de Reunião A',
    espacoId: 1,
    status: 'CONFIRMADA',
  },
  {
    id: 102,
    dataHoraInicio:  new Date(now.getTime() - 5 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    espacoNome: 'Espaço Criativo',
    espacoId: 3,
    status: 'CONCLUIDA',
  },
  {
    id: 103,
    dataHoraInicio:  new Date(now.getTime() + 24 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() + 26 * 60 * 60 * 1000),
    espacoNome: 'Sala Coletiva B',
    espacoId: 2,
    status: 'CANCELADA',
  },
]

function HomePage() {
  return (
    <div className="px-4 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-muted-foreground">Bom dia 👋</p>
          <h1 className="text-[22px] font-medium text-foreground mt-0.5">Meus Espaços</h1>
        </div>
        <div className="flex gap-2">
          <Button id="btn-notifications" variant="ghost" size="icon" aria-label="Notificações" className="rounded-full min-h-[48px] min-w-[48px]">
            <IconBell size={22} aria-hidden="true" />
          </Button>
          <Button id="btn-settings" variant="ghost" size="icon" aria-label="Configurações" className="rounded-full min-h-[48px] min-w-[48px]">
            <IconSettings size={22} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Label htmlFor="search-spaces" className="sr-only">Buscar espaço</Label>
        <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <Input id="search-spaces" type="search" placeholder="Buscar espaço..." className="pl-9 h-12 rounded-sm text-[15px]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="rounded-md">
          <CardHeader className="pb-1">
            <CardDescription className="text-[11px] uppercase tracking-[0.07em] font-medium">Disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[32px] font-medium text-[#1D9E75]">1</p>
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader className="pb-1">
            <CardDescription className="text-[11px] uppercase tracking-[0.07em] font-medium">Ocupados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[32px] font-medium text-[#A32D2D]">1</p>
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="spaces-heading">
        <h2 id="spaces-heading" className="text-[17px] font-medium mb-3">Espaços recentes</h2>
        <div className="space-y-3">
          {SPACES.map((s) => (
            <SpaceCard key={s.id} {...s} onClick={() => alert(`Abrir espaço #${s.id}`)} />
          ))}
        </div>
      </section>
    </div>
  )
}

function SpacesPage() {
  return (
    <div className="px-4 pt-6 space-y-4">
      <h1 className="text-[22px] font-medium">Todos os Espaços</h1>
      <div className="space-y-3">
        {SPACES.map((s) => (
          <SpaceCard key={s.id} {...s} onClick={() => alert(`Abrir espaço #${s.id}`)} />
        ))}
      </div>
    </div>
  )
}

function BookingsPage() {
  return (
    <div className="px-4 pt-6 space-y-4">
      <h1 className="text-[22px] font-medium">Minhas Reservas</h1>
      <div className="space-y-3">
        {BOOKINGS.map((b) => (
          <BookingCard key={b.id} {...b} onClick={() => alert(`Abrir reserva #${b.id}`)} />
        ))}
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="px-4 pt-6 space-y-6">
      <h1 className="text-[22px] font-medium">Perfil</h1>

      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="text-[17px]">Design System</CardTitle>
          <CardDescription>Tokens da identidade visual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Status badges</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="available" />
              <StatusBadge status="occupied" />
              <StatusBadge status="pending" />
              <StatusBadge status="reserved" />
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Botões</p>
            <div className="flex flex-col gap-2">
              <Button id="btn-primary"   variant="default"     className="h-12 w-full rounded-sm">Primário</Button>
              <Button id="btn-secondary" variant="secondary"   className="h-12 w-full rounded-sm">Secundário</Button>
              <Button id="btn-outline"   variant="outline"     className="h-12 w-full rounded-sm">Delineado</Button>
              <Button id="btn-ghost"     variant="ghost"       className="h-12 w-full rounded-sm">Ghost</Button>
              <Button id="btn-danger"    variant="destructive" className="h-12 w-full rounded-sm">Perigo</Button>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Campos de formulário</p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="demo-input" className="text-[13px] font-medium text-muted-foreground">Campo padrão</Label>
                <Input id="demo-input" placeholder="Placeholder..." className="h-12 rounded-sm text-[15px]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-error-input" className="text-[13px] font-medium text-muted-foreground">Campo com erro</Label>
                <Input
                  id="demo-error-input"
                  defaultValue="valor inválido"
                  aria-describedby="demo-error-msg"
                  aria-invalid="true"
                  className="h-12 rounded-sm text-[15px] border-[#A32D2D] focus-visible:ring-[#A32D2D]/20"
                />
                <p id="demo-error-msg" className="text-[13px] text-[#A32D2D]">Este campo é obrigatório.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Estado de carregamento</p>
            <div className="space-y-2">
              <Skeleton className="h-[88px] w-full rounded-md" />
              <Skeleton className="h-[88px] w-full rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home')
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((d) => !d)
    document.documentElement.classList.toggle('dark')
  }

  const pages: Record<NavTab, React.ReactElement> = {
    home:     <HomePage />,
    spaces:   <SpacesPage />,
    bookings: <BookingsPage />,
    profile:  <ProfilePage />,
  }

  return (
    <>
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

      <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {pages[activeTab]}
      </AppLayout>
    </>
  )
}
