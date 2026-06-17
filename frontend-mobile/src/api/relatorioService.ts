import { callSoapService } from './soapClient'
import { mapReservaStatus } from './reservaService'
import type { ReservaStatusValue } from '@/models'

export interface RelatorioInfo {
  id: number
  espacoId: number
  nomeEspaco: string
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: ReservaStatusValue
}

const namespace = 'http://www.aps.com/api/relatorio'
const endpointPath = '/relatorio'

export const RelatorioService = {
  gerarRelatorio: async (dataHoraInicio: string, dataHoraTermino: string) => {
    return callSoapService<{ reservas?: any | any[] }>(
      { endpointPath, namespace, operation: 'gerarRelatorio' },
      { dataHoraInicio, dataHoraTermino }
    ).then(res => {
      if (!res.reservas) return []
      const arr = Array.isArray(res.reservas) ? res.reservas : [res.reservas]
      return arr.map(r => ({
        ...r,
        id: Number(r.id),
        espacoId: Number(r.espacoId),
        status: mapReservaStatus(r.status)
      })) as RelatorioInfo[]
    })
  }
}

