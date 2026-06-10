export interface Usuario {
  cpf: string
}

export interface Espaco {
  id: number
  nome: number
  capacidadeMaxima: number
  status: EspacoStatus
}

export interface EspacoStatus {
  DISPONIVEL: "Disponível"
  OCUPADO: "Ocupado"
  MANUTENCAO: "Fechado para Manutenção"
}

export interface Reserva {
  id: number
  dataHoraInicio: Date
  dataHoraTermino: Date
  espacoId: number
  usuarioId: number
  status: ReservaStatus
}

export interface ReservaStatus {
  CONFIRMADA: "Confirmada"
  CONCLUIDA: "Concluída"
  CANCELADA: "Cancelada"
}