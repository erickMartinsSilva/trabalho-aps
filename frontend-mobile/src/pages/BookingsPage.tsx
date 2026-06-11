import { BookingCard } from '@/components/BookingCard'

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

export default function BookingsPage() {
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
