import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconPlus, IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import InputLabel from '@/components/InputLabel'
import { type Usuario } from '@/models'

const MOCK_USERS: Usuario[] = [
  { id: 1, nome: "João Silva", cpf: "111.222.333-44" },
  { id: 2, nome: "Maria Oliveira", cpf: "555.666.777-88" },
  { id: 3, nome: "Carlos Pereira", cpf: "999.888.777-66" },
]

export default function AdminUsersPage() {
  const navigate = useNavigate()
  
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<Usuario | null>(null)
  const [userToDelete, setUserToDelete] = useState<Usuario | null>(null)

  const handleConfirmCreate = () => {
    alert("Usuário adicionado com sucesso!")
    setIsCreateOpen(false)
  }

  const handleConfirmEdit = () => {
    alert(`Usuário ${userToEdit?.nome} atualizado com sucesso!`)
    setUserToEdit(null)
  }

  const handleConfirmDelete = () => {
    alert(`Usuário ${userToDelete?.nome} excluído!`)
    setUserToDelete(null)
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')} className="-ml-2">
            <IconArrowLeft />
          </Button>
          <h1 className="text-[22px] font-medium">Usuários</h1>
        </div>
        <Button size="sm" className="flex gap-1" onClick={() => setIsCreateOpen(true)}>
          <IconPlus size={16} /> Novo
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pb-4 mt-2">
        {MOCK_USERS.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <p className="font-medium">{u.nome}</p>
                <p className="text-sm text-muted-foreground">{u.cpf}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => setUserToEdit(u)}>
                  <IconEdit size={16} /> Editar
                </Button>
                <Button variant="destructive" size="sm" className="gap-2 w-full" onClick={() => setUserToDelete(u)}>
                  <IconTrash size={16} /> Excluir
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
            <DialogTitle>Adicionar Usuário</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <InputLabel label="Nome" placeholder="Nome completo" />
            <InputLabel label="CPF" placeholder="000.000.000-00" />
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
      <Dialog open={!!userToEdit} onOpenChange={(open) => !open && setUserToEdit(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {userToEdit && (
            <div className="flex flex-col gap-3 py-4">
              <InputLabel label="Nome" defaultValue={userToEdit.nome} />
              <InputLabel label="CPF" defaultValue={userToEdit.cpf} />
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
      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir o usuário <strong>{userToDelete?.nome}</strong>?</p>
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
