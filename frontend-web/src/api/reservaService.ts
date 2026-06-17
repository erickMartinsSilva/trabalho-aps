import { ReservaStatus, type ReservaStatusValue, type ReservaInfo } from '@/models'
import { callSoapService } from './soapClient'

const namespace = 'http://www.aps.com/api/reserva'
const endpointPath = '/reserva'

export function mapReservaStatus(status: string): ReservaStatusValue {
  switch (status) {
    case 'CRIADA':
      return ReservaStatus.CONFIRMADA
    case 'CONCLUIDA':
      return ReservaStatus.CONCLUIDA
    case 'CANCELADA':
      return ReservaStatus.CANCELADA
    default:
      return ReservaStatus.CONFIRMADA
  }
}

interface SoapReserva {
  id: string | number
  espacoId: string | number
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: string
}

export const ReservaService = {
  reservarEspaco: async (cpf: string, espacoId: number, dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'reservarEspaco' },
      { cpf, espacoId, dataHoraInicio, dataHoraTermino }
    )
  },

  listarReservas: async () => {
    return callSoapService<{ reservas?: SoapReserva | SoapReserva[] }>(
      { endpointPath, namespace, operation: 'listarReservas' },
      {}
    ).then(res => {
      if (!res.reservas) return []
      const arr = Array.isArray(res.reservas) ? res.reservas : [res.reservas]
      return arr.map(r => ({
        ...r,
        id: Number(r.id),
        espacoId: Number(r.espacoId),
        cpfUsuario: String(r.cpfUsuario),
        dataHoraInicio: r.dataHoraInicio?.replace(' ', 'T'),
        dataHoraTermino: r.dataHoraTermino?.replace(' ', 'T'),
        status: mapReservaStatus(r.status)
      })) as ReservaInfo[]
    })
  }
}
