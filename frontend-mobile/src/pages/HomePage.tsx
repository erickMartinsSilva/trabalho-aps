import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SpaceCard } from '@/components/SpaceCard'
import { BookingCard } from '@/components/BookingCard'
import { IconLogout, IconPlus, IconCalendarEvent } from '@tabler/icons-react'
import { ESPACOS, RESERVAS } from '@/data'
import { ReservaStatus } from '@/models'
import { useNavigate } from 'react-router'

export default function HomePage() {
  const navigate = useNavigate()

  // Find the next confirmed booking
  const nextBooking = RESERVAS.filter(r => r.status === ReservaStatus.CONFIRMADA)
    .sort((a, b) => a.dataHoraInicio.getTime() - b.dataHoraInicio.getTime())[0]

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-medium text-foreground mt-0.5">Seja bem-vindo(a)!</h1>
        </div>
        <div className="flex gap-2">
          <Button id="btn-logout" variant="ghost" size="icon" aria-label="Sair" onClick={() => { localStorage.removeItem('role'); navigate('/'); }} className="rounded-full min-h-[48px] min-w-[48px] text-destructive hover:bg-destructive/10">
            <IconLogout size={22} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden space-y-6 pb-6">
        {/* Quick Actions */}
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

        {/* Next Booking Section */}
        <section aria-labelledby="next-booking-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="next-booking-heading" className="text-[17px] font-medium">Sua próxima reserva</h2>
          </div>
          {nextBooking ? (
            <div className="cursor-pointer">
              <BookingCard {...nextBooking} />
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

        {/* Featured Spaces */}
        <section aria-labelledby="spaces-heading" className='flex-1 flex flex-col overflow-hidden'>
          <h2 id="spaces-heading" className="text-[17px] font-medium mb-3">Espaços em destaque</h2>
          <div className="space-y-3 overflow-y-auto">
            {ESPACOS.slice(0, 3).map((s) => (
              <SpaceCard key={s.id} {...s} />
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
