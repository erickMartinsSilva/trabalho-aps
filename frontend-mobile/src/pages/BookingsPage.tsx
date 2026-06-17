import { BookingCard } from '@/components/BookingCard'
import { Button } from '@/components/ui/button'
import { ReservaService, type ReservaInfo } from '@/api/reservaService'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

export default function BookingsPage() {
  const navigate = useNavigate()
  const [reservas, setReservas] = useState<ReservaInfo[]>([])

  const fetchReservas = () => {
    const cpf = localStorage.getItem('cpf')
    if (cpf) {
      ReservaService.listarReservas().then(res => {
        const userReservas = res.filter(r => r.cpfUsuario === cpf)
        setReservas(userReservas)
      }).catch(console.error)
    }
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  const sortedReservas = [...reservas].sort((a, b) => {
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
          {sortedReservas.length === 0 &&
            <div className='m-auto flex flex-col gap-2 justify-center items-center'>
              <p>Você ainda não possui reservas.</p>
              <Button size='lg' onClick={() => navigate('/spaces')}>
                Consultar espaços
              </Button>
            </div>
          }
          {sortedReservas.map((b) => (
            <BookingCard
              key={b.id}
              {...b}
              dataHoraInicio={new Date(b.dataHoraInicio)}
              dataHoraTermino={new Date(b.dataHoraTermino)}
              onCancelled={fetchReservas}
            />
          ))}
        </div>
      </div>
    </>
  )
}
