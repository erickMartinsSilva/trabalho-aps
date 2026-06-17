import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SpaceCard } from '@/components/SpaceCard'
import { BookingCard } from '@/components/BookingCard'
import { IconLogout, IconPlus, IconCalendarEvent } from '@tabler/icons-react'
import { BookingStatus } from '@/models'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { SpaceService, type SpaceInfo } from '@/api/spaceService'
import { BookingService, type BookingInfo } from '@/api/bookingService'
import { clearSession } from '@/utils'

export default function HomePage() {
  const navigate = useNavigate()

  const [spaces, setSpaces] = useState<SpaceInfo[]>([])
  const [nextBooking, setNextBooking] = useState<BookingInfo | null>(null)

  const fetchNextBooking = () => {
    const cpf = localStorage.getItem('cpf')
    if (cpf) {
      BookingService.listBookings().then(res => {
        const userBookings = res.filter(booking => booking.cpfUsuario === cpf && booking.status === BookingStatus.CONFIRMADA)
        if (userBookings.length > 0) {
          const next = userBookings.sort((a, b) => new Date(a.dataHoraInicio).getTime() - new Date(b.dataHoraInicio).getTime())[0]
          setNextBooking(next)
        } else {
          setNextBooking(null)
        }
      }).catch(console.error)
    }
  }

  useEffect(() => {
    SpaceService.listSpaces().then(setSpaces).catch(console.error)
    fetchNextBooking()
  }, [])

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-medium text-foreground mt-0.5">Seja bem-vindo(a)!</h1>
        </div>
        <div className="flex gap-2">
          <Button id="btn-logout" variant="ghost" size="icon" aria-label="Sair" onClick={() => { clearSession(); navigate('/'); }} className="rounded-full min-h-[48px] min-w-[48px] text-destructive hover:bg-destructive/10">
            <IconLogout size={22} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden space-y-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-md cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate('/spaces')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <IconPlus className="text-primary" size={28} />
              <p className="text-sm font-medium">Nova Reserva</p>
            </CardContent>
          </Card>
          <Card className="rounded-md cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate('/bookings')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <IconCalendarEvent className="text-primary" size={28} />
              <p className="text-sm font-medium">Minhas Reservas</p>
            </CardContent>
          </Card>
        </div>

        <section aria-labelledby="next-booking-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="next-booking-heading" className="text-[17px] font-medium">Sua próxima reserva</h2>
          </div>
          {nextBooking ? (
            <div className="cursor-pointer">
              <BookingCard
                {...nextBooking}
                dataHoraInicio={new Date(nextBooking.dataHoraInicio)}
                dataHoraTermino={new Date(nextBooking.dataHoraTermino)}
                onCancelled={fetchNextBooking}
              />
            </div>
          ) : (
            <Card className="rounded-md border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <p className="text-sm text-muted-foreground">Você não possui reservas futuras.</p>
                <Button variant="outline" size="sm" onClick={() => navigate('/spaces')}>Encontrar um espaço</Button>
              </CardContent>
            </Card>
          )}
        </section>

        <section aria-labelledby="spaces-heading" className='flex-1 flex flex-col overflow-hidden'>
          <h2 id="spaces-heading" className="text-[17px] font-medium mb-3">Espaços em destaque</h2>
          <div className="space-y-3 overflow-y-auto">
            {spaces.slice(0, 3).map((space) => (
              <SpaceCard key={space.id} {...space} />
            ))}
            <Button variant="outline" className="w-full mt-2" onClick={() => navigate('/spaces')}>
              Ver todos os espaços
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
