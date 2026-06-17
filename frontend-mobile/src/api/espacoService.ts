import { EspacoStatus, type EspacoStatusValue } from '@/models'
import { callSoapService } from './soapClient'

export interface EspacoInfo {
  id: number
  nome: string
  descricao?: string
  capacidadeMaxima: number
  status: EspacoStatusValue
}

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

export const EspacoService = {
  cadastrarEspaco: async (cpf: string, nome: string, descricao: string, capacidadeMaxima: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'cadastrarEspaco' },
      { cpf, nome, descricao, capacidadeMaxima }
    )
  },

  atualizarEspaco: async (cpf: string, id: number, nome?: string, descricao?: string, capacidadeMaxima?: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'atualizarEspaco' },
      { cpf, id, ...(nome && { nome }), ...(descricao && { descricao }), ...(capacidadeMaxima && { capacidadeMaxima }) }
    )
  },

  deletarEspaco: async (cpf: string, id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'deletarEspaco' },
      { cpf, id }
    )
  },

  buscarEspaco: async (id: number) => {
    return callSoapService<{ espaco: any }>(
      { endpointPath, namespace, operation: 'buscarEspaco' },
      { id }
    ).then(res => {
      if (res.espaco) {
        res.espaco.id = Number(res.espaco.id)
        res.espaco.capacidadeMaxima = Number(res.espaco.capacidadeMaxima)
        res.espaco.status = mapEspacoStatus(res.espaco.status)
      }
      return res as { espaco: EspacoInfo }
    })
  },

  listarEspacos: async () => {
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
        status: mapEspacoStatus(e.status)
      })) as EspacoInfo[]
    })
  },

  fecharEspaco: async (cpf: string, id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'fecharEspaco' },
      { cpf, id }
    )
  },

  reabrirEspaco: async (cpf: string, id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'reabrirEspaco' },
      { cpf, id }
    )
  }
}

