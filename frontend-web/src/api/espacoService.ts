import { EspacoStatus, type EspacoStatusValue, type EspacoInfo } from '@/models'
import { callSoapService } from './soapClient'

const namespace = 'http://www.aps.com/api/espaco'
const endpointPath = '/espaco'

export function mapEspacoStatus(status: string): EspacoStatusValue {
  switch (status) {
    case 'DISPONIVEL':
      return EspacoStatus.DISPONIVEL
    case 'OCUPADO':
      return EspacoStatus.OCUPADO
    case 'FECHADO_PARA_MANUTENCAO':
      return EspacoStatus.MANUTENCAO
    default:
      return EspacoStatus.DISPONIVEL
  }
}

interface SoapEspaco {
  id: string | number
  nome: string
  descricao?: string
  capacidadeMaxima: string | number
  status: string
}

export const EspacoService = {
  listarEspacos: async () => {
    return callSoapService<{ espacos?: SoapEspaco | SoapEspaco[] }>(
      { endpointPath, namespace, operation: 'listarEspacos' },
      {}
    ).then(res => {
      if (!res.espacos) return []
      const arr = Array.isArray(res.espacos) ? res.espacos : [res.espacos]
      return arr.map(e => ({
        ...e,
        id: Number(e.id),
        capacidadeMaxima: Number(e.capacidadeMaxima),
        status: mapEspacoStatus(e.status)
      })) as EspacoInfo[]
    })
  }
}
