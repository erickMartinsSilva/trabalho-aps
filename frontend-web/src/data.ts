import { SpaceStatus, BookingStatus, type Space, type Booking, type User } from '@/models'

export const SPACES: Space[] = [
  { id: 1, nome: 'Sala de Jogos', descricao: 'Espaço de lazer equipado com mesas de sinuca, ping-pong e videogames. Ideal para diversão em grupo.', capacidadeMaxima: 10, status: SpaceStatus.DISPONIVEL },
  { id: 2, nome: 'Salão de Festas A', descricao: 'Salão principal climatizado, perfeito para confraternizações e aniversários. Conta com cozinha de apoio e banheiros independentes.', capacidadeMaxima: 6, status: SpaceStatus.OCUPADO },
  { id: 3, nome: 'Salão de Festas B', descricao: 'Espaço aconchegante para eventos menores e reuniões íntimas. Possui sistema de som integrado e decoração moderna.', capacidadeMaxima: 4, status: SpaceStatus.MANUTENCAO },
  { id: 4, nome: 'Churrasqueira A', descricao: 'Área externa coberta com churrasqueira a carvão, mesas rústicas de madeira e pia. Ótimo para o almoço de domingo.', capacidadeMaxima: 8, status: SpaceStatus.OCUPADO },
  { id: 5, nome: 'Churrasqueira B', descricao: 'Espaço gourmet ao ar livre equipado com churrasqueira, freezer e bancada de granito. Ideal para curtir com amigos.', capacidadeMaxima: 8, status: SpaceStatus.DISPONIVEL },
]

export const USERS: User[] = [
  { id: 1, nome: 'Carlos Eduardo Ramos', cpf: '11122233344' },
  { id: 2, nome: 'Mariana Souza Dias', cpf: '55566677788' },
  { id: 3, nome: 'Danillo Barbosa Ferreira', cpf: '99988877766' },
  { id: 4, nome: 'Ana Júlia Ribeiro', cpf: '12345678900' },
]

const now = new Date()

export const BOOKINGS: Omit<Booking, 'usuarioId'>[] = [
  {
    id: 101,
    dataHoraInicio:  new Date(now.getTime() + 1 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() + 3 * 60 * 60 * 1000),
    espacoId: 1,
    status: BookingStatus.CONFIRMADA,
  },
  {
    id: 102,
    dataHoraInicio:  new Date(now.getTime() - 5 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    espacoId: 3,
    status: BookingStatus.CONCLUIDA,
  },
  {
    id: 103,
    dataHoraInicio:  new Date(now.getTime() + 24 * 60 * 60 * 1000),
    dataHoraTermino: new Date(now.getTime() + 26 * 60 * 60 * 1000),
    espacoId: 2,
    status: BookingStatus.CANCELADA,
  },
]