import { BookingStatus, type BookingStatusValue, type BookingInfo } from '@/models'
import { callSoapService } from './soapClient'

const namespace = 'http://www.aps.com/api/reserva'
const endpointPath = '/reserva'

export function mapBookingStatus(status: string): BookingStatusValue {
  switch (status) {
    case 'CRIADA':
      return BookingStatus.CONFIRMADA
    case 'CONCLUIDA':
      return BookingStatus.CONCLUIDA
    case 'CANCELADA':
      return BookingStatus.CANCELADA
    default:
      return BookingStatus.CONFIRMADA
  }
}

interface SoapBooking {
  id: string | number
  espacoId: string | number
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: string
}

export const BookingService = {
  bookSpace: async (cpf: string, espacoId: number, dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'reservarEspaco' },
      { cpf, espacoId, dataHoraInicio, dataHoraTermino }
    )
  },

  listBookings: async () => {
    return callSoapService<{ reservas?: SoapBooking | SoapBooking[] }>(
      { endpointPath, namespace, operation: 'listarReservas' },
      {}
    ).then(res => {
      if (!res.reservas) return []
      const arr = Array.isArray(res.reservas) ? res.reservas : [res.reservas]
      return arr.map(r => ({
        ...r,
        id: Number(r.id),
        espacoId: Number(r.espacoId),
        cpfUsuario: String(r.cpfUsuario).padStart(11, '0'),
        dataHoraInicio: r.dataHoraInicio?.replace(' ', 'T'),
        dataHoraTermino: r.dataHoraTermino?.replace(' ', 'T'),
        status: mapBookingStatus(r.status)
      })) as BookingInfo[]
    })
  }
}
