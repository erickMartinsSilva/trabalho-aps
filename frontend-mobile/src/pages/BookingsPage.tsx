import { BookingCard } from '@/components/BookingCard'
import { Button } from '@/components/ui/button'
import { BookingService, type BookingInfo } from '@/api/bookingService'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

export default function BookingsPage() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<BookingInfo[]>([])

  const fetchBookings = () => {
    const cpf = localStorage.getItem('cpf')
    if (cpf) {
      BookingService.listBookings().then(res => {
        const userBookings = res.filter(booking => booking.cpfUsuario === cpf)
        setBookings(userBookings)
      }).catch(console.error)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const sortedBookings = [...bookings].sort((a, b) => {
    const getWeight = (status: string) => {
      if (status === 'Confirmada') return 1
      if (status === 'Concluída') return 2
      if (status === 'Cancelada') return 3
      return 4
    }
    const weightA = getWeight(a.status)
    const weightB = getWeight(b.status)
    if (weightA !== weightB) {
      return weightA - weightB
    }
    return new Date(b.dataHoraInicio).getTime() - new Date(a.dataHoraInicio).getTime()
  })

  return (
    <>
      <div className="flex flex-1 flex-col h-full px-4 pt-6 space-y-4">
        <h1 className="text-[22px] font-medium">Minhas Reservas</h1>
        <div className="space-y-3 overflow-y-auto flex-1 flex flex-col">
          {sortedBookings.length === 0 &&
            <div className='m-auto flex flex-col gap-2 justify-center items-center'>
              <p>Você ainda não possui reservas.</p>
              <Button size='lg' onClick={() => navigate('/spaces')}>
                Consultar espaços
              </Button>
            </div>
          }
          {sortedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              {...booking}
              dataHoraInicio={new Date(booking.dataHoraInicio)}
              dataHoraTermino={new Date(booking.dataHoraTermino)}
              onCancelled={fetchBookings}
            />
          ))}
        </div>
      </div>
    </>
  )
}
