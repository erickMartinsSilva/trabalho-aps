import { BookingCard } from '@/components/BookingCard'
import { Button } from '@/components/ui/button'
import { RESERVAS } from '@/data'
import { useNavigate } from 'react-router'

export default function BookingsPage() {
  const navigate = useNavigate()

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
          {sortedReservas.map((b) => (
            <BookingCard key={b.id} {...b} />
          ))}
        </div>
      </div>
    </>
  )
}
