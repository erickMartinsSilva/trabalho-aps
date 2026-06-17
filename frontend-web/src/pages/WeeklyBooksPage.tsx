import { useMemo, useState, useEffect } from 'react'
import { BookingCard } from '@/components/BookingCard'
import { IconInfoCircle, IconCalendarWeek } from '@tabler/icons-react'
import { BookingService } from '@/api/bookingService'
import { SpaceService } from '@/api/spaceService'
import type { BookingInfo, SpaceInfo } from '@/models'

export default function WeeklyBooksPage() {
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null)
  const [bookings, setBookings] = useState<BookingInfo[]>([])
  const [spaces, setSpaces] = useState<SpaceInfo[]>([])

  useEffect(() => {
    Promise.all([
      BookingService.listBookings(),
      SpaceService.listSpaces()
    ]).then(([resBookings, resSpaces]) => {
      setBookings(resBookings)
      setSpaces(resSpaces)
    }).catch(console.error)
  }, [])

  const nextDays = useMemo(() => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }, [])

  const weeklySchedule = useMemo(() => {
    return nextDays.map((dayDate) => {
      const bookingsForDay = bookings.filter(booking => {
        const d = new Date(booking.dataHoraInicio)
        return (
          d.getDate() === dayDate.getDate() &&
          d.getMonth() === dayDate.getMonth() &&
          d.getFullYear() === dayDate.getFullYear()
        )
      }).map(booking => {
        const space = spaces.find(s => s.id === booking.espacoId)
        
        return {
          ...booking,
          dataHoraInicio: new Date(booking.dataHoraInicio),
          dataHoraTermino: new Date(booking.dataHoraTermino),
          espacoNome: space?.nome,
        }
      })

      return {
        date: dayDate,
        title: dayDate.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }),
        bookings: bookingsForDay
      }
    })
  }, [nextDays, bookings, spaces])

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-10 lg:p-14 bg-background">
      <div className="w-full max-w-[1400px] mx-auto space-y-10">
        <header className="border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1A5C8A] text-white rounded-xl shadow-sm">
              <IconCalendarWeek size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1A5C8A] dark:text-[#E8F2FA] tracking-tight">
                Agenda Semanal de Reservas
              </h1>
              <p className="text-[17px] text-muted-foreground mt-1">
                Clique em uma reserva para consultar seus detalhes.
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-10">
          {weeklySchedule.map((dayBlock, index) => (
            <section key={index} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1A5C8A] dark:text-[#E8F2FA] capitalize border-l-4 border-[#1A5C8A] pl-3">
                {dayBlock.title}
              </h3>

              {dayBlock.bookings.length === 0 ? (
                <p className="text-sm text-muted-foreground bg-card/40 p-4 rounded-xl border border-border/60">
                  Nenhuma reserva programada para este dia.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {dayBlock.bookings.map((item) => {
                    const isExpanded = expandedBooking === item.id

                    return (
                      <div key={item.id} className="flex flex-col space-y-2">
                        <div className={`transition-all duration-200 rounded-xl ${isExpanded ? 'ring-2 ring-[#1A5C8A] ring-offset-2' : ''}`}>
                          <BookingCard
                            id={item.id}
                            dataHoraInicio={item.dataHoraInicio}
                            dataHoraTermino={item.dataHoraTermino}
                            espacoId={item.espacoId}
                            espacoNome={item.espacoNome}
                            status={item.status}
                            className="shadow-sm h-full hover:border-[#1A5C8A]/50 cursor-pointer bg-white"
                            onClick={() => setExpandedBooking(isExpanded ? null : item.id)}
                          />
                        </div>

                        {isExpanded && (
                          <div className="bg-white rounded-xl p-5 border border-[#1A5C8A]/20 shadow-md space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                            <div className="flex items-center gap-2 border-b border-border pb-2 text-[#1A5C8A]">
                              <IconInfoCircle size={20} />
                              <h4 className="font-semibold text-[15px]">Detalhes da Reserva</h4>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-[13px]">
                              <div className="col-span-2">
                                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-medium mb-1">
                                  Responsável (CPF)
                                </span>
                                <span className="font-semibold text-foreground text-[15px]">
                                  {item.cpfUsuario}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-medium mb-1">
                                  Início
                                </span>
                                <span className="font-medium text-foreground">
                                  {formatTime(item.dataHoraInicio)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-medium mb-1">
                                  Término
                                </span>
                                <span className="font-medium text-foreground">
                                  {formatTime(item.dataHoraTermino)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}