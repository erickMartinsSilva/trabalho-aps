import { BookingCard } from '@/components/BookingCard'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ESPACOS, RESERVAS } from '@/data'
import { ReservaStatus, type Reserva } from '@/models'
import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function BookingsPage() {
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState<Reserva>(undefined)
  const [cancelBookingButtonPressed, setCancelBookingButtonPressed] = useState<boolean>(false)

  const navigate = useNavigate()

  const onCancelBookingButtonPress = (booking: Reserva) => {
    setSelectedBookingToCancel(booking)
    setCancelBookingButtonPressed(true)
  }

  const onConfirmCancelBooking = (booking: Reserva) => {
    alert(`Reserva número ${booking.id} cancelada com sucesso!`)
    setCancelBookingButtonPressed(false)
  }

  const sortedReservas = RESERVAS.sort((a, b) => b.dataHoraInicio.getTime() - a.dataHoraInicio.getTime())

  return (
    <>
      <div className="flex flex-1 flex-col h-full px-4 pt-6 space-y-4">
        <h1 className="text-[22px] font-medium">Minhas Reservas</h1>
        <div className="space-y-3 overflow-y-auto flex-1 flex flex-col">
          {sortedReservas.length === 0 &&
            <div className='m-auto flex flex-col gap-2 justify-center items-center'>
              <p>Você ainda não possui reservas.</p>
              <Button size='lg' onClick={() => navigate('/spaces')}>
                Consultar espaços
              </Button>
            </div>
          }
          {sortedReservas.map((b) => {
            const currentBookingCancellable = b.status === ReservaStatus.CONFIRMADA
            const currentBookingSpace = ESPACOS.find((e) => e.id === b.espacoId)

            return (
              <Dialog>
                <DialogTrigger className={"w-full"}>
                  <BookingCard className='text-left' key={b.id} {...b} />
                </DialogTrigger>
                <DialogContent hidden={cancelBookingButtonPressed} className="w-[90vw] max-w-[350px] rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="col-span-2">Reserva #{b.id}</DialogTitle>
                  </DialogHeader>

                  <section className='flex flex-col gap-2'>
                    <p className='flex justify-between'>
                      <span>Status:</span>
                      <StatusBadge status={b.status}/>
                    </p>
                    <p className='flex justify-between'>
                      <span>Espaço:</span><span>{currentBookingSpace ? currentBookingSpace.nome : "Não identificado"}</span>
                    </p>
                    <p className='flex justify-between'>
                      <span>Data:</span><span>{format(b.dataHoraInicio, "P")}</span>
                    </p>
                    <p className='flex justify-between'>
                      <span>Horário de Início:</span><span>{b.dataHoraInicio.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                    </p>
                    <p className='flex justify-between'>
                      <span>Horário de Término:</span><span>{b.dataHoraTermino.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
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
                      onClick={() => onCancelBookingButtonPress(b)}
                    >
                      Cancelar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          )})}

          {cancelBookingButtonPressed && 
            <Dialog open={true} onOpenChange={setCancelBookingButtonPressed}>
              <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Cancelar Reserva</DialogTitle>
                </DialogHeader>
                <p>Tem certeza que deseja cancelar esta reserva?</p>
                <p className='font-bold text-red-800'>Esta ação não pode ser desfeita.</p>
                <DialogFooter className='grid grid-cols-3'>
                  <DialogClose>
                    <Button variant="outline" className="w-full">Não</Button>
                  </DialogClose>
                  <Button variant='destructive' className="w-full col-start-3" onClick={() => onConfirmCancelBooking(selectedBookingToCancel)}>
                    Sim
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        </div>
      </div>
    </>
  )
}
