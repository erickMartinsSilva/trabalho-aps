import { SpaceStatus, type SpaceStatusValue } from '@/models'
import { callSoapService } from './soapClient'

export interface SpaceInfo {
  id: number
  nome: string
  descricao?: string
  capacidadeMaxima: number
  status: SpaceStatusValue
}

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

export const SpaceService = {
  registerSpace: async (cpf: string, nome: string, descricao: string, capacidadeMaxima: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'cadastrarEspaco' },
      { cpf, nome, descricao, capacidadeMaxima }
    )
  },

  updateSpace: async (cpf: string, id: number, nome?: string, descricao?: string, capacidadeMaxima?: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'atualizarEspaco' },
      { cpf, id, ...(nome && { nome }), ...(descricao && { descricao }), ...(capacidadeMaxima && { capacidadeMaxima }) }
    )
  },

  deleteSpace: async (cpf: string, id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'deletarEspaco' },
      { cpf, id }
    )
  },

  getSpace: async (id: number) => {
    return callSoapService<{ espaco: any }>(
      { endpointPath, namespace, operation: 'buscarEspaco' },
      { id }
    ).then(res => {
      if (res.espaco) {
        res.espaco.id = Number(res.espaco.id)
        res.espaco.capacidadeMaxima = Number(res.espaco.capacidadeMaxima)
        res.espaco.status = mapSpaceStatus(res.espaco.status)
      }
      return res as { espaco: SpaceInfo }
    })
  },

  listSpaces: async () => {
    return callSoapService<{ espacos?: any | any[] }>(
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
  },

  closeSpace: async (cpf: string, id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'fecharEspaco' },
      { cpf, id }
    )
  },

  reopenSpace: async (cpf: string, id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'reabrirEspaco' },
      { cpf, id }
    )
  }
}
