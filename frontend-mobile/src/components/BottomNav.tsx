import { IconHome, IconBuilding, IconCalendar, IconUser } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export type NavTab = 'home' | 'spaces' | 'bookings' | 'profile'

interface NavItem {
  id: NavTab
  label: string
  Icon: React.ElementType
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',     label: 'Início',   Icon: IconHome },
  { id: 'spaces',   label: 'Espaços',  Icon: IconBuilding },
  { id: 'bookings', label: 'Reservas', Icon: IconCalendar },
  { id: 'profile',  label: 'Perfil',   Icon: IconUser },
]

interface BottomNavProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
  className?: string
}

export function BottomNav({ activeTab, onTabChange, className }: BottomNavProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        'sticky bottom-0 z-50',
        'flex h-[60px] items-stretch',
        'border-t border-border bg-white dark:bg-[oklch(0.178_0.015_260)]',
        className,
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            id={`nav-tab-${id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={label}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-0.5 min-h-[48px]',
              'text-[11px] font-medium uppercase tracking-[0.07em]',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
              isActive
                ? 'text-[#1A5C8A] dark:text-[oklch(0.600_0.120_243)]'
                : 'text-[#B4B2A9]',
            )}
          >
            <Icon size={22} aria-hidden="true" stroke={isActive ? 2 : 1.5} />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
