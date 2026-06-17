import { useNavigate, useLocation } from 'react-router'
import { IconCalendarEvent, IconCalendarWeek, IconCalendarPlus, IconBuildingCommunity } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export type NavItem = {
  path: string
  label: string
  Icon: React.ElementType
}

const NAV_ITEMS: NavItem[] = [
  { path: '/painel', label: 'Painel do Dia', Icon: IconCalendarEvent },
  { path: '/semana', label: 'Painel da Semana', Icon: IconCalendarWeek },
  { path: '/reserva', label: 'Nova Reserva', Icon: IconCalendarPlus },
]

export function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <aside className="w-[280px] h-full flex flex-col bg-white dark:bg-[oklch(0.178_0.015_260)] border-r border-[#ECEAE4] shadow-sm shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-[#ECEAE4]">
        <div className="p-2 bg-[#1A5C8A] text-white rounded-lg">
          <IconBuildingCommunity size={24} />
        </div>
        <div>
          <h2 className="text-[#1A5C8A] dark:text-[#E8F2FA] font-bold text-lg leading-tight">Portaria</h2>
          <p className="text-[12px] text-[#5F5E5A]">Sistema de Gestão</p>
        </div>
      </div>

      <nav aria-label="Navegação Lateral" className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map(({ path, label, Icon }) => {
          const isActive = pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all text-left',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A5C8A]',
                isActive
                  ? 'bg-[#E8F2FA] dark:bg-[oklch(0.600_0.120_243)/15] text-[#1A5C8A] dark:text-[#E8F2FA]'
                  : 'text-[#5F5E5A] hover:bg-[#F7F6F3] dark:hover:bg-white/5'
              )}
            >
              <Icon size={22} stroke={isActive ? 2 : 1.5} />
              {label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}