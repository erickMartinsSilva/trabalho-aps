import { ReservaStatus, type ReservaStatusValue } from '@/models'
import { callSoapService } from './soapClient'

export interface ReservaInfo {
  id: number
  espacoId: number
  nomeEspaco: string
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: ReservaStatusValue
}

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

export const ReservaService = {
  reservarEspaco: async (cpf: string, espacoId: number, dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'reservarEspaco' },
      { cpf, espacoId, dataHoraInicio, dataHoraTermino }
    )
  },

  atualizarReserva: async (id: number, dataHoraInicio?: string, dataHoraTermino?: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'atualizarReserva' },
      { id, ...(dataHoraInicio && { dataHoraInicio }), ...(dataHoraTermino && { dataHoraTermino }) }
    )
  },

  deletarReserva: async (id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'deletarReserva' },
      { id }
    )
  },

  cancelarReserva: async (id: number, motivo?: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'cancelarReserva' },
      { id, ...(motivo && { motivo }) }
    )
  },

  buscarReserva: async (id: number) => {
    return callSoapService<{ reserva: any }>(
      { endpointPath, namespace, operation: 'buscarReserva' },
      { id }
    ).then(res => {
      if (res.reserva) {
        res.reserva.id = Number(res.reserva.id)
        res.reserva.espacoId = Number(res.reserva.espacoId)
        res.reserva.cpfUsuario = String(res.reserva.cpfUsuario).padStart(11, '0')
        res.reserva.dataHoraInicio = res.reserva.dataHoraInicio?.replace(' ', 'T')
        res.reserva.dataHoraTermino = res.reserva.dataHoraTermino?.replace(' ', 'T')
        res.reserva.status = mapReservaStatus(res.reserva.status)
      }
      return res as { reserva: ReservaInfo }
    })
  },

  listarReservas: async () => {
    return callSoapService<{ reservas?: any | any[] }>(
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
        status: mapReservaStatus(r.status)
      })) as ReservaInfo[]
    })
  }
}

