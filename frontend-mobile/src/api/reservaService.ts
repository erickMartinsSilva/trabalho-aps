import { callSoapService } from './soapClient'

export interface ReservaInfo {
  id: number
  espacoId: number
  nomeEspaco: string
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: string
}

const namespace = 'http://www.aps.com/api/reserva'
const endpointPath = '/reserva'

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
    return callSoapService<{ reserva: ReservaInfo }>(
      { endpointPath, namespace, operation: 'buscarReserva' },
      { id }
    )
  },

  listarReservas: async () => {
    return callSoapService<{ reservas?: ReservaInfo | ReservaInfo[] }>(
      { endpointPath, namespace, operation: 'listarReservas' },
      {}
    ).then(res => {
      if (!res.reservas) return []
      return Array.isArray(res.reservas) ? res.reservas : [res.reservas]
    })
  }
}
