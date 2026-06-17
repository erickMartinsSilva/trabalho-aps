import { callSoapService } from './soapClient'

export interface UsuarioInfo {
  cpf: string
}

const namespace = 'http://www.aps.com/api/usuario'
const endpointPath = '/usuario'

export const UsuarioService = {
  login: async (cpf: string, senha: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string; isAdmin?: any }>(
      { endpointPath, namespace, operation: 'login' },
      { cpf, senha }
    ).then(res => {
      return {
        ...res,
        isAdmin: res.isAdmin === true || res.isAdmin === 'true'
      }
    })
  },

  cadastrarUsuario: async (cpf: string, senha: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'cadastrarUsuario' },
      { cpf, senha }
    )
  },

  atualizarUsuario: async (cpfAntigo: string, cpfNovo?: string, senha?: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'atualizarUsuario' },
      { cpfAntigo, ...(cpfNovo && { cpfNovo }), ...(senha && { senha }) }
    )
  },

  alterarSenha: async (cpf: string, senhaAtual: string, senhaNova: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'alterarSenha' },
      { cpf, senhaAtual, senhaNova }
    )
  },

  deletarUsuario: async (cpf: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'deletarUsuario' },
      { cpf }
    )
  },

  buscarUsuario: async (cpf: string) => {
    return callSoapService<{ cpf: string }>(
      { endpointPath, namespace, operation: 'buscarUsuario' },
      { cpf }
    ).then(res => {
      return {
        ...res,
        cpf: String(res.cpf).padStart(11, '0')
      }
    })
  },

  listarUsuarios: async () => {
    return callSoapService<{ usuarios?: UsuarioInfo | UsuarioInfo[] }>(
      { endpointPath, namespace, operation: 'listarUsuarios' },
      {}
    ).then(res => {
      if (!res.usuarios) return []
      const arr = Array.isArray(res.usuarios) ? res.usuarios : [res.usuarios]
      return arr.map(u => ({
        ...u,
        cpf: String(u.cpf).padStart(11, '0')
      })) as UsuarioInfo[]
    })
  }
}
