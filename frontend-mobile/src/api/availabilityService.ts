import { callSoapService } from './soapClient'

export interface AvailabilityInfo {
  espacoId: number
  nomeEspaco: string
  dataHoraInicio: string
  dataHoraTermino: string
  disponivel: boolean
}

const namespace = 'http://www.aps.com/api/disponibilidade'
const endpointPath = '/disponibilidade'

export const AvailabilityService = {
  checkAvailability: async (espacoId: number, dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ disponibilidades?: AvailabilityInfo | AvailabilityInfo[] }>(
      { endpointPath, namespace, operation: 'consultarDisponibilidade' },
      { espacoId, dataHoraInicio, dataHoraTermino }
    ).then(res => {
      if (!res.disponibilidades) return []
      return Array.isArray(res.disponibilidades) ? res.disponibilidades : [res.disponibilidades]
    })
  }
}
