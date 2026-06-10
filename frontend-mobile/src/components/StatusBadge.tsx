import {
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconInfoCircle,
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export type BadgeStatus = 'available' | 'occupied' | 'pending' | 'reserved'

interface StatusBadgeProps {
  status: BadgeStatus
  className?: string
}

const config: Record<
  BadgeStatus,
  { label: string; Icon: React.ElementType; bg: string; text: string }
> = {
  available: { label: 'Disponível', Icon: IconCircleCheck, bg: 'bg-[#E1F5EE]', text: 'text-[#085041]' },
  occupied:  { label: 'Ocupado',    Icon: IconCircleX,     bg: 'bg-[#FCEBEB]', text: 'text-[#791F1F]' },
  pending:   { label: 'Pendente',   Icon: IconClock,       bg: 'bg-[#FAEEDA]', text: 'text-[#633806]' },
  reserved:  { label: 'Reservado',  Icon: IconInfoCircle,  bg: 'bg-[#E8F2FA]', text: 'text-[#0D3A5C]' },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, Icon, bg, text } = config[status]

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
