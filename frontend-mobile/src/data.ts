import { EspacoStatus, ReservaStatus, type Espaco, type Reserva } from '@/models'

export const ESPACOS: Espaco[] = [
  { id: 1, nome: 'Sala de Jogos',       capacidadeMaxima: 10, status: EspacoStatus.DISPONIVEL },
  { id: 2, nome: 'Salão de Festas A',   capacidadeMaxima: 6,  status: EspacoStatus.OCUPADO },
  { id: 3, nome: 'Salão de Festas B',   capacidadeMaxima: 4,  status: EspacoStatus.MANUTENCAO },
  { id: 4, nome: 'Churrasqueira A',     capacidadeMaxima: 8,  status: EspacoStatus.OCUPADO },
  { id: 5, nome: 'Churrasqueira B',     capacidadeMaxima: 8,  status: EspacoStatus.DISPONIVEL },
]

const now = new Date()

export const RESERVAS: Omit<Reserva, 'usuarioId'>[] = [
  {
    id: 101,
    dataHoraInicio:  new Date(now.getTime() + 1 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() + 3 * 60 * 60 * 1000),
    espacoId: 1,
    status: ReservaStatus.CONFIRMADA,
  },
  {
    id: 102,
    dataHoraInicio:  new Date(now.getTime() - 5 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    espacoId: 3,
    status: ReservaStatus.CONCLUIDA,
  },
  {
    id: 103,
    dataHoraInicio:  new Date(now.getTime() + 24 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() + 26 * 60 * 60 * 1000),
    espacoId: 2,
    status: ReservaStatus.CANCELADA,
  },
]
