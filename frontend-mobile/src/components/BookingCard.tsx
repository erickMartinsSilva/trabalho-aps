import { IconCalendar, IconCalendarCheck, IconCalendarX } from '@tabler/icons-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'
import type { ReservaStatusValue } from '@/models'
import { cn } from '@/lib/utils'

export interface BookingCardProps {
  id: number
  dataHoraInicio: Date
  dataHoraTermino: Date
  espacoNome?: string
  espacoId: number
  status: ReservaStatusValue
  onClick?: () => void
  className?: string
}

const fmt = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function BookingCard({
  id,
  dataHoraInicio,
  dataHoraTermino,
  espacoNome,
  espacoId,
  status,
  onClick,
  className,
}: BookingCardProps) {
  const StatusIcon =
    status === 'Cancelada' ? IconCalendarX
    : status === 'Concluída' ? IconCalendarCheck
    : IconCalendar

  return (
    <Card
      id={`booking-card-${id}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }
          : undefined
      }
      className={cn(
        'rounded-md border border-border bg-card transition-shadow',
        onClick &&
          'cursor-pointer hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <StatusIcon size={20} className="shrink-0 text-muted-foreground" aria-hidden="true" />
            <CardTitle className="text-[17px] font-medium leading-tight">
              {espacoNome ?? `Espaço #${espacoId}`}
            </CardTitle>
          </div>
          <StatusBadge status={status} className="shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-1">
        <p className="text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">Início:</span>{' '}
          {fmt.format(dataHoraInicio)}
        </p>
        <p className="text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">Término:</span>{' '}
          {fmt.format(dataHoraTermino)}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <p className="text-[13px] text-muted-foreground">
          Reserva <span className="font-medium text-foreground">#{id}</span>
        </p>
      </CardFooter>
    </Card>
  )
}
