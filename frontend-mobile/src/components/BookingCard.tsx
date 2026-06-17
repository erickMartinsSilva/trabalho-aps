import { IconCalendar, IconCalendarCheck, IconCalendarX } from '@tabler/icons-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'
import { BookingStatus, type BookingStatusValue } from '@/models'
import { cn } from '@/lib/utils'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle as DialogTitleUI, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { SpaceService, type SpaceInfo } from '@/api/spaceService'
import { format } from 'date-fns'
import { toast } from 'sonner'

import { BookingService } from '@/api/bookingService'

export interface BookingCardProps {
  id: number
  dataHoraInicio: Date
  dataHoraTermino: Date
  espacoNome?: string
  espacoId: number
  status: BookingStatusValue
  onClick?: () => void
  className?: string
  onCancelled?: () => void
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
  onCancelled,
}: BookingCardProps) {
  const [cancelBookingButtonPressed, setCancelBookingButtonPressed] = useState<boolean>(false)

  const StatusIcon =
    status === 'Cancelada' ? IconCalendarX
    : status === 'Concluída' ? IconCalendarCheck
    : IconCalendar

  const currentBookingCancellable = status === BookingStatus.CONFIRMADA
  const [currentBookingSpace, setCurrentBookingSpace] = useState<SpaceInfo | null>(null)

  useEffect(() => {
    if (espacoId) {
      SpaceService.getSpace(espacoId).then(res => {
        if (res.espaco) setCurrentBookingSpace(res.espaco)
      }).catch(console.error)
    }
  }, [espacoId])

  const onConfirmCancelBooking = async () => {
    try {
      const res = await BookingService.cancelBooking(id)
      if (res.sucesso) {
        toast.success(`Reserva cancelada com sucesso!`)
        setCancelBookingButtonPressed(false)
        onCancelled?.()
      } else {
        toast.error("Erro ao cancelar reserva: " + res.mensagem)
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  const cardContent = (
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
        'cursor-pointer hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <StatusIcon size={20} className="shrink-0 text-muted-foreground" aria-hidden="true" />
            <CardTitle className="text-[17px] font-medium leading-tight">
              {espacoNome ?? currentBookingSpace?.nome ?? `Espaço #${espacoId}`}
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

  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full text-left">
          {cardContent}
        </DialogTrigger>
        <DialogContent hidden={cancelBookingButtonPressed} className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitleUI className="col-span-2">Reserva #{id}</DialogTitleUI>
          </DialogHeader>

          <section className='flex flex-col gap-2'>
            <p className='flex justify-between'>
              <span>Status:</span>
              <StatusBadge status={status}/>
            </p>
            <p className='flex justify-between'>
              <span>Espaço:</span><span>{currentBookingSpace ? currentBookingSpace.nome : "Não identificado"}</span>
            </p>
            <p className='flex justify-between'>
              <span>Data:</span><span>{format(dataHoraInicio, "P")}</span>
            </p>
            <p className='flex justify-between'>
              <span>Horário de Início:</span><span>{dataHoraInicio.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
            </p>
            <p className='flex justify-between'>
              <span>Horário de Término:</span><span>{dataHoraTermino.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
            </p>
          </section>
          
          <DialogFooter className='grid grid-cols-3'>
            <DialogClose>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </DialogClose>
            <Button
              variant='destructive'
              className="col-start-3"
              disabled={!currentBookingCancellable}
              onClick={() => setCancelBookingButtonPressed(true)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {cancelBookingButtonPressed && 
        <Dialog open={true} onOpenChange={setCancelBookingButtonPressed}>
          <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
            <DialogHeader>
              <DialogTitleUI>Cancelar Reserva</DialogTitleUI>
            </DialogHeader>
            <p>Tem certeza que deseja cancelar esta reserva?</p>
            <p className='font-bold text-red-800'>Esta ação não pode ser desfeita.</p>
            <DialogFooter className='grid grid-cols-3'>
              <DialogClose>
                <Button variant="outline" className="w-full">Não</Button>
              </DialogClose>
              <Button variant='destructive' className="w-full col-start-3" onClick={onConfirmCancelBooking}>
                Sim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    </>
  )
}
