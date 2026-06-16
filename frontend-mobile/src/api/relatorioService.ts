import { callSoapService } from './soapClient'

export interface RelatorioInfo {
  id: number
  espacoId: number
  nomeEspaco: string
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: string
}

const namespace = 'http://www.aps.com/api/relatorio'
const endpointPath = '/relatorio'

export const RelatorioService = {
  gerarRelatorio: async (dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ reservas?: RelatorioInfo | RelatorioInfo[] }>(
      { endpointPath, namespace, operation: 'gerarRelatorio' },
      { dataHoraInicio, dataHoraTermino }
    ).then(res => {
      if (!res.reservas) return []
      return Array.isArray(res.reservas) ? res.reservas : [res.reservas]
    })
  }
}
