import { callSoapService } from './soapClient'

export interface EspacoInfo {
  id: number
  nome: string
  capacidadeMaxima: number
  status: string
}

const namespace = 'http://www.aps.com/api/espaco'
const endpointPath = '/espaco' // Defaulting to /espaco, adjust if necessary

export const EspacoService = {
  cadastrarEspaco: async (nome: string, capacidadeMaxima: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'cadastrarEspaco' },
      { nome, capacidadeMaxima }
    )
  },

  atualizarEspaco: async (id: number, nome?: string, capacidadeMaxima?: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'atualizarEspaco' },
      { id, ...(nome && { nome }), ...(capacidadeMaxima && { capacidadeMaxima }) }
    )
  },

  deletarEspaco: async (id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'deletarEspaco' },
      { id }
    )
  },

  buscarEspaco: async (id: number) => {
    return callSoapService<{ espaco: EspacoInfo }>(
      { endpointPath, namespace, operation: 'buscarEspaco' },
      { id }
    )
  },

  listarEspacos: async () => {
    return callSoapService<{ espacos?: EspacoInfo | EspacoInfo[] }>(
      { endpointPath, namespace, operation: 'listarEspacos' },
      {}
    ).then(res => {
      // Ensure we always return an array
      if (!res.espacos) return []
      return Array.isArray(res.espacos) ? res.espacos : [res.espacos]
    })
  },

  fecharEspaco: async (id: number) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'fecharEspaco' },
      { id }
    )
  }
}
