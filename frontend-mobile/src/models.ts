export interface User {
  id: number
  nome: string
  cpf: string
}

export const SpaceStatus = {
  DISPONIVEL: "Disponível",
  OCUPADO: "Ocupado",
  MANUTENCAO: "Em manutenção",
} as const

export type SpaceStatusValue = typeof SpaceStatus[keyof typeof SpaceStatus]

export interface Space {
  id: number
  nome: string
  descricao?: string
  capacidadeMaxima: number
  status: SpaceStatusValue
}

export interface Booking {
  id: number
  dataHoraInicio: Date
  dataHoraTermino: Date
  espacoId: number
  usuarioId?: number
  status: BookingStatusValue
}

export const BookingStatus = {
  CONFIRMADA: "Confirmada",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
} as const

export type BookingStatusValue = typeof BookingStatus[keyof typeof BookingStatus]
