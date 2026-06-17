import {
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconInfoCircle,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import type { SpaceStatusValue, BookingStatusValue } from '@/models'

export type BadgeStatus = SpaceStatusValue | BookingStatusValue

interface StatusBadgeProps {
  status: BadgeStatus
  className?: string
}

const config: Record<
  BadgeStatus,
  { label: string; Icon: React.ElementType; bg: string; text: string }
> = {
  'Disponível': { label: 'Disponível', Icon: IconCircleCheck, bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  'Ocupado': { label: 'Ocupado', Icon: IconCircleX, bg: 'bg-[#FCEBEB]', text: 'text-[#791F1F]' },
  'Em manutenção': { label: 'Em manutenção', Icon: IconClock, bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  'Confirmada': { label: 'Confirmada', Icon: IconInfoCircle, bg: 'bg-[#E8F2FA]', text: 'text-[#0D3A5C]' },
  'Concluída': { label: 'Concluída', Icon: IconCircleCheck, bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  'Cancelada': { label: 'Cancelada', Icon: IconCircleX, bg: 'bg-[#FCEBEB]', text: 'text-[#791F1F]' },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const badgeConfig = config[status]

  if (!badgeConfig) return null

  const { label, Icon, bg, text } = badgeConfig

  return (
    <span
      role="status"
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[13px] font-medium leading-none',
        bg,
        text,
        className,
      )}
    >
      <Icon size={14} aria-hidden="true" />
      {label}
    </span>
  )
}
