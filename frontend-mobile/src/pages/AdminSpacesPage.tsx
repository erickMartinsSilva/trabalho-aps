import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconPlus, IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import InputLabel from '@/components/InputLabel'
import { StatusBadge } from '@/components/StatusBadge'
import { type Espaco, EspacoStatus } from '@/models'
import { ESPACOS } from '@/data'

export default function AdminSpacesPage() {
  const navigate = useNavigate()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [spaceToEdit, setSpaceToEdit] = useState<Espaco | null>(null)
  const [spaceToDelete, setSpaceToDelete] = useState<Espaco | null>(null)

  const handleConfirmCreate = () => {
    alert("Espaço adicionado com sucesso!")
    setIsCreateOpen(false)
  }

  const handleConfirmEdit = () => {
    alert(`Espaço ${spaceToEdit?.nome} atualizado com sucesso!`)
    setSpaceToEdit(null)
  }

  const handleConfirmDelete = () => {
    alert(`Espaço ${spaceToDelete?.nome} excluído!`)
    setSpaceToDelete(null)
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')} className="-ml-2">
            <IconArrowLeft />
          </Button>
          <h1 className="text-[22px] font-medium">Espaços</h1>
        </div>
        <Button size="sm" className="flex gap-1" onClick={() => setIsCreateOpen(true)}>
          <IconPlus size={16} /> Novo
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pb-4 mt-2">
        {ESPACOS.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <p className="font-medium">{s.nome}</p>
                <p className="text-sm text-muted-foreground mb-1">Capacidade: {s.capacidadeMaxima}</p>
                <StatusBadge status={s.status} />
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => setSpaceToEdit(s)}>
                  <IconEdit size={16}/> Editar
                </Button>
                <Button variant="destructive" size="sm" className="gap-2 w-full" onClick={() => setSpaceToDelete(s)}>
                  <IconTrash size={16}/> Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Espaço</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <InputLabel label="Nome" placeholder="Nome do espaço" />
            <InputLabel label="Capacidade" type="number" placeholder="Capacidade máxima" />
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmCreate} className="w-full">Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!spaceToEdit} onOpenChange={(open) => !open && setSpaceToEdit(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Espaço</DialogTitle>
          </DialogHeader>
          {spaceToEdit && (
            <div className="flex flex-col gap-3 py-4">
              <InputLabel label="Nome" defaultValue={spaceToEdit.nome} />
              <InputLabel label="Capacidade" type="number" defaultValue={spaceToEdit.capacidadeMaxima} />
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select defaultValue={spaceToEdit.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(EspacoStatus).map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmEdit} className="w-full">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!spaceToDelete} onOpenChange={(open) => !open && setSpaceToDelete(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Excluir Espaço</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir o espaço <strong>{spaceToDelete?.nome}</strong>?</p>
          <p className="font-bold text-red-800">Esta ação não pode ser desfeita.</p>
          <DialogFooter className="grid grid-cols-2 gap-2 mt-4">
            <DialogClose>
              <Button variant="outline" className="w-full">Não</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete} className="w-full">Sim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
