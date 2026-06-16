import { callSoapService } from './soapClient'

export interface DisponibilidadeInfo {
  espacoId: number
  nomeEspaco: string
  dataHoraInicio: string
  dataHoraTermino: string
  disponivel: boolean
}

const namespace = 'http://www.aps.com/api/disponibilidade'
const endpointPath = '/disponibilidade'

export const DisponibilidadeService = {
  consultarDisponibilidade: async (espacoId: number, dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ disponibilidades?: DisponibilidadeInfo | DisponibilidadeInfo[] }>(
      { endpointPath, namespace, operation: 'consultarDisponibilidade' },
      { espacoId, dataHoraInicio, dataHoraTermino }
    ).then(res => {
      if (!res.disponibilidades) return []
      return Array.isArray(res.disponibilidades) ? res.disponibilidades : [res.disponibilidades]
    })
  }
}
