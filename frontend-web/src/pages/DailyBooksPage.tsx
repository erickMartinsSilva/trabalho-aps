import { useMemo, useState, useEffect } from 'react'
import { BookingCard } from '@/components/BookingCard'
import { IconInfoCircle } from '@tabler/icons-react'
import { ReservaService } from '@/api/reservaService'
import { EspacoService } from '@/api/espacoService'
import type { ReservaInfo, EspacoInfo } from '@/models'

export default function DailyBooksPage() {
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

  const listagemReservasDoDia = useMemo(() => {
    const hoje = new Date()
    
    return reservas.filter(reserva => {
      const dataReserva = new Date(reserva.dataHoraInicio)
      return (
        dataReserva.getDate() === hoje.getDate() &&
        dataReserva.getMonth() === hoje.getMonth() &&
        dataReserva.getFullYear() === hoje.getFullYear()
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
  }, [reservas, espacos])

  const formatarHora = (data: Date) => {
    return new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-10 lg:p-14">
      <div className="w-full max-w-[1400px] mx-auto space-y-8">
        <header className="border-b border-[#ECEAE4] pb-6">
          <h1 className="text-4xl font-medium text-[#1A5C8A] dark:text-[#E8F2FA] tracking-tight">
            Painel de Controle — Reservas do Dia
          </h1>
          <p className="text-[17px] text-[#5F5E5A] mt-2">
            Clique em uma reserva para consultar seus detalhes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listagemReservasDoDia.length === 0 ? (
            <p className="text-[15px] text-[#5F5E5A] col-span-full bg-white p-8 rounded-xl border border-[#ECEAE4] shadow-sm">
              Não há reservas feitas para a data de hoje.
            </p>
          ) : (
            listagemReservasDoDia.map((item) => {
              const isExpanded = reservaExpandida === item.id

              return (
                <div key={item.id} className="flex flex-col space-y-2">
                  <div 
                    className={`transition-all duration-200 rounded-xl ${isExpanded ? 'ring-2 ring-[#1A5C8A] ring-offset-2' : ''}`}
                  >
                    <BookingCard
                      id={item.id}
                      dataHoraInicio={item.dataHoraInicio}
                      dataHoraTermino={item.dataHoraTermino}
                      espacoId={item.espacoId}
                      espacoNome={item.espacoNome}
                      status={item.status}
                      className="shadow-sm h-full hover:border-[#1A5C8A]/50 cursor-pointer"
                      onClick={() => setReservaExpandida(isExpanded ? null : item.id)}
                    />
                  </div>
                  
                  {isExpanded && (
                    <div className="bg-white rounded-xl p-5 border border-[#1A5C8A]/20 shadow-md space-y-4 animate-in slide-in-from-top-2 fade-in duration-200 relative">
                      <div className="flex items-center gap-2 border-b border-[#ECEAE4] pb-2 text-[#1A5C8A]">
                        <IconInfoCircle size={20} />
                        <h4 className="font-semibold text-[15px]">Detalhes da Reserva</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <span className="text-[#5F5E5A] block text-[11px] uppercase tracking-wider font-medium mb-1">
                            Responsável (CPF)
                          </span>
                          <span className="font-semibold text-[#2C2C2A] text-[15px]">
                            {item.cpfUsuario}
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-[#5F5E5A] block text-[11px] uppercase tracking-wider font-medium mb-1">
                            Início
                          </span>
                          <span className="font-medium text-[#2C2C2A]">
                            {formatarHora(item.dataHoraInicio)}
                          </span>
                        </div>

                        <div>
                          <span className="text-[#5F5E5A] block text-[11px] uppercase tracking-wider font-medium mb-1">
                            Término
                          </span>
                          <span className="font-medium text-[#2C2C2A]">
                            {formatarHora(item.dataHoraTermino)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}