import { SpaceCard } from '@/components/SpaceCard'

const SPACES = [
  { id: 1, nome: 'Sala de Reunião A', capacidadeMaxima: 10, status: 'available' as const },
  { id: 2, nome: 'Sala Coletiva B',   capacidadeMaxima: 6,  status: 'occupied'  as const },
  { id: 3, nome: 'Espaço Criativo',   capacidadeMaxima: 4,  status: 'pending'   as const },
  { id: 4, nome: 'Sala de Projetos',  capacidadeMaxima: 8,  status: 'reserved'  as const },
]

export default function SpacesPage() {
  return (
    <div className="px-4 pt-6 space-y-4">
      <h1 className="text-[22px] font-medium">Todos os Espaços</h1>
      <div className="space-y-3">
        {SPACES.map((s) => (
          <SpaceCard key={s.id} {...s} onClick={() => alert(`Abrir espaço #${s.id}`)} />
        ))}
      </div>
    </div>
  )
}
