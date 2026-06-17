export interface Usuario {
  id: number
  nome: string
  cpf: string
}

export const EspacoStatus = {
  DISPONIVEL: "Disponível",
  OCUPADO: "Ocupado",
  MANUTENCAO: "Em manutenção",
} as const

export type EspacoStatusValue = typeof EspacoStatus[keyof typeof EspacoStatus]

export interface Espaco {
  id: number
  nome: string
  descricao?: string
  capacidadeMaxima: number
  status: EspacoStatusValue
}

export interface Reserva {
  id: number
  dataHoraInicio: Date
  dataHoraTermino: Date
  espacoId: number
  usuarioId?: number
  status: ReservaStatusValue
}

export const ReservaStatus = {
  CONFIRMADA: "Confirmada",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
} as const

export type ReservaStatusValue = typeof ReservaStatus[keyof typeof ReservaStatus]

export interface EspacoInfo {
  id: number
  nome: string
  descricao?: string
  capacidadeMaxima: number
  status: EspacoStatusValue
}

export interface ReservaInfo {
  id: number
  espacoId: number
  nomeEspaco: string
  cpfUsuario: string
  dataHoraInicio: string
  dataHoraTermino: string
  status: ReservaStatusValue
}

export interface UsuarioInfo {
  cpf: string
}

export interface DisponibilidadeInfo {
  espacoId: number
  nomeEspaco: string
  dataHoraInicio: string
  dataHoraTermino: string
  disponivel: boolean
}
