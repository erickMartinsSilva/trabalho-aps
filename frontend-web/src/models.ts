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






