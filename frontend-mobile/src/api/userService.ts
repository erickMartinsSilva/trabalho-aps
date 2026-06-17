import { callSoapService } from './soapClient'

export interface UserInfo {
  cpf: string
}

const namespace = 'http://www.aps.com/api/usuario'
const endpointPath = '/usuario'

export const UserService = {
  login: async (cpf: string, password: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string; isAdmin?: any }>(
      { endpointPath, namespace, operation: 'login' },
      { cpf, senha: password }
    ).then(res => {
      return {
        ...res,
        isAdmin: res.isAdmin === true || res.isAdmin === 'true'
      }
    })
  },

  registerUser: async (cpf: string, password: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'cadastrarUsuario' },
      { cpf, senha: password }
    )
  },

  updateUser: async (cpfOld: string, cpfNew?: string, password?: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'atualizarUsuario' },
      { cpfAntigo: cpfOld, ...(cpfNew && { cpfNovo: cpfNew }), ...(password && { senha: password }) }
    )
  },

  changePassword: async (cpf: string, currentPassword: string, newPassword: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'alterarSenha' },
      { cpf, senhaAtual: currentPassword, senhaNova: newPassword }
    )
  },

  deleteUser: async (cpf: string) => {
    return callSoapService<{ sucesso: boolean; mensagem: string }>(
      { endpointPath, namespace, operation: 'deletarUsuario' },
      { cpf }
    )
  },

  getUser: async (cpf: string) => {
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

  listUsers: async () => {
    return callSoapService<{ usuarios?: UserInfo | UserInfo[] }>(
      { endpointPath, namespace, operation: 'listarUsuarios' },
      {}
    ).then(res => {
      if (!res.usuarios) return []
      const arr = Array.isArray(res.usuarios) ? res.usuarios : [res.usuarios]
      return arr.map(u => ({
        ...u,
        cpf: String(u.cpf).padStart(11, '0')
      })) as UserInfo[]
    })
  }
}
