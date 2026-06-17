import { SpaceStatus, type SpaceStatusValue, type SpaceInfo } from '@/models'
import { callSoapService } from './soapClient'

const namespace = 'http://www.aps.com/api/espaco'
const endpointPath = '/espaco'

export function mapSpaceStatus(status: string): SpaceStatusValue {
  switch (status) {
    case 'DISPONIVEL':
      return SpaceStatus.DISPONIVEL
    case 'OCUPADO':
      return SpaceStatus.OCUPADO
    case 'FECHADO_PARA_MANUTENCAO':
      return SpaceStatus.MANUTENCAO
    default:
      return SpaceStatus.DISPONIVEL
  }
}

interface SoapSpace {
  id: string | number
  nome: string
  descricao?: string
  capacidadeMaxima: string | number
  status: string
}

export const SpaceService = {
  listSpaces: async () => {
    return callSoapService<{ espacos?: SoapSpace | SoapSpace[] }>(
      { endpointPath, namespace, operation: 'listarEspacos' },
      {}
    ).then(res => {
      if (!res.espacos) return []
      const arr = Array.isArray(res.espacos) ? res.espacos : [res.espacos]
      return arr.map(e => ({
        ...e,
        id: Number(e.id),
        capacidadeMaxima: Number(e.capacidadeMaxima),
        status: mapSpaceStatus(e.status)
      })) as SpaceInfo[]
    })
  }
}
