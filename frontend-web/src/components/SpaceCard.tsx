import { IconBuilding, IconUsers } from '@tabler/icons-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'
import type { EspacoStatusValue } from '@/models'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router'

export interface SpaceCardProps {
  id: number
  nome: string
  capacidadeMaxima: number
  status: EspacoStatusValue
  onClick?: () => void
  className?: string
}

export function SpaceCard({
  id,
  nome,
  capacidadeMaxima,
  status,
  onClick,
  className,
}: SpaceCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      id={`space-card-${id}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick ?? navigate(`/spaces/${id}`)}
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
            <IconBuilding size={20} className="shrink-0 text-muted-foreground" aria-hidden="true" />
            <CardTitle className="text-[17px] font-medium leading-tight truncate">
              {nome}
            </CardTitle>
          </div>
          <StatusBadge status={status} className="shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-[13px] text-muted-foreground">
          Código: <span className="font-medium text-foreground">#{id}</span>
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <IconUsers size={16} aria-hidden="true" />
          <span>Capacidade: {capacidadeMaxima} pessoas</span>
        </div>
      </CardFooter>
    </Card>
  )
}
