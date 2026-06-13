import { BookingCard } from '@/components/BookingCard'
import { RESERVAS } from '@/data'

export default function BookingsPage() {
  return (
    <div className="flex flex-1 flex-col min-h-svh px-4 pt-6 space-y-4">
      <h1 className="text-[22px] font-medium">Minhas Reservas</h1>
      <div className="space-y-3 overflow-y-auto">
        {RESERVAS.map((b) => (
          <BookingCard key={b.id} {...b} onClick={() => alert(`Abrir reserva #${b.id}`)} />
        ))}
      </div>
    </div>
  )
}
