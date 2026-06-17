import { useMemo, useState, useEffect } from 'react'
import { BookingCard } from '@/components/BookingCard'
import { IconInfoCircle, IconCalendarWeek } from '@tabler/icons-react'
import { ReservaService } from '@/api/reservaService'
import { EspacoService } from '@/api/espacoService'
import type { ReservaInfo, EspacoInfo } from '@/models'

export default function WeeklyBooksPage() {
  const [reservaExpandida, setReservaExpandida] = useState<number | null>(null)
  const [reservas, setReservas] = useState<ReservaInfo[]>([])
  const [espacos, setEspacos] = useState<EspacoInfo[]>([])

  useEffect(() => {
    Promise.all([
      ReservaService.listarReservas(),
      EspacoService.listarEspacos()
    ]).then(([resReservas, resEspacos]) => {
      setReservas(resReservas)
      setEspacos(resEspacos)
    }).catch(console.error)
  }, [])

  const próximosDias = useMemo(() => {
    const dias = []
    for (let i = 0; i < 7; i++) {
      const data = new Date()
      data.setDate(data.getDate() + i)
      dias.push(data)
    }
    return dias
  }, [])

  const cronogramaSemanal = useMemo(() => {
    return próximosDias.map((dataDia) => {
      const reservasDoDia = reservas.filter(reserva => {
        const d = new Date(reserva.dataHoraInicio)
        return (
          d.getDate() === dataDia.getDate() &&
          d.getMonth() === dataDia.getMonth() &&
          d.getFullYear() === dataDia.getFullYear()
        )
      }).map(reserva => {
        const espaco = espacos.find(e => e.id === reserva.espacoId)
        
        return {
          ...reserva,
          dataHoraInicio: new Date(reserva.dataHoraInicio),
          dataHoraTermino: new Date(reserva.dataHoraTermino),
          espacoNome: espaco?.nome,
        }
      })

      return {
        data: dataDia,
        titulo: dataDia.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }),
        reservas: reservasDoDia
      }
    })
  }, [próximosDias, reservas, espacos])

  const formatarHora = (data: Date) => {
    return new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
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
          {cronogramaSemanal.map((blocoDia, indexMod) => (
            <section key={indexMod} className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1A5C8A] dark:text-[#E8F2FA] capitalize border-l-4 border-[#1A5C8A] pl-3">
                {blocoDia.titulo}
              </h3>

              {blocoDia.reservas.length === 0 ? (
                <p className="text-sm text-muted-foreground bg-card/40 p-4 rounded-xl border border-border/60">
                  Nenhuma reserva programada para este dia.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {blocoDia.reservas.map((item) => {
                    const isExpanded = reservaExpandida === item.id

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
                            onClick={() => setReservaExpandida(isExpanded ? null : item.id)}
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
                                  {formatarHora(item.dataHoraInicio)}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground block text-[11px] uppercase tracking-wider font-medium mb-1">
                                  Término
                                </span>
                                <span className="font-medium text-foreground">
                                  {formatarHora(item.dataHoraTermino)}
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