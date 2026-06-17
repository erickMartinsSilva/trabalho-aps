import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconPlus, IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { UserService, type UserInfo } from '@/api/userService'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import InputLabel from '@/components/InputLabel'
import { toast } from 'sonner'

export default function AdminUsersPage() {
  const navigate = useNavigate()
  
  const [users, setUsers] = useState<UserInfo[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<UserInfo | null>(null)
  const [userToDelete, setUserToDelete] = useState<UserInfo | null>(null)

  const [createData, setCreateData] = useState({ cpf: '', password: '' })
  const [editData, setEditData] = useState({ cpf: '', password: '' })

  const fetchUsers = () => UserService.listUsers().then(setUsers).catch(console.error)

  useEffect(() => { fetchUsers() }, [])

  const handleConfirmCreate = async () => {
    try {
      await UserService.registerUser(createData.cpf, createData.password)
      toast.success("Usuário adicionado com sucesso!")
      setIsCreateOpen(false)
      fetchUsers()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmEdit = async () => {
    if(!userToEdit) return
    const cpfChanged = editData.cpf !== userToEdit.cpf
    const passwordChanged = editData.password.trim().length > 0

    if (!cpfChanged && !passwordChanged) {
      toast.error("Nenhuma alteração informada.")
      return
    }

    try {
      const res = await UserService.updateUser(
        userToEdit.cpf,
        cpfChanged ? editData.cpf : undefined,
        passwordChanged ? editData.password : undefined
      )
      if (res.sucesso) {
        toast.success(`Usuário atualizado com sucesso!`)
        setUserToEdit(null)
        setEditData({ cpf: '', password: '' })
        fetchUsers()
      } else {
        toast.error(`Erro ao atualizar: ${res.mensagem}`)
      }
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmDelete = async () => {
    if(!userToDelete) return
    try {
      await UserService.deleteUser(userToDelete.cpf)
      toast.success(`Usuário excluído!`)
      setUserToDelete(null)
      fetchUsers()
    } catch(e: any) { console.error(e) }
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
        {users.map((user) => (
          <Card key={user.cpf}>
            <CardContent className="p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <p className="font-medium">CPF: {user.cpf}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => { setUserToEdit(user); setEditData({ cpf: user.cpf, password: '' }) }}>
                  <IconEdit size={16} /> Editar
                </Button>
                <Button variant="destructive" size="sm" className="gap-2 w-full" onClick={() => setUserToDelete(user)}>
                  <IconTrash size={16} /> Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Usuário</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <InputLabel label="CPF" placeholder="Apenas números" value={createData.cpf} onChange={(e) => setCreateData({...createData, cpf: e.target.value})} />
            <InputLabel label="Senha" type="password" placeholder="Senha" value={createData.password} onChange={(e) => setCreateData({...createData, password: e.target.value})} />
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmCreate} className="w-full">Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!userToEdit} onOpenChange={(open) => { if (!open) { setUserToEdit(null); setEditData({ cpf: '', password: '' }); } }}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {userToEdit && (
            <div className="flex flex-col gap-3 py-4">
              <InputLabel label="CPF" value={editData.cpf} onChange={(e) => setEditData({...editData, cpf: e.target.value})} />
              <InputLabel label="Nova Senha" type="password" placeholder="Insira a nova senha" value={editData.password} onChange={(e) => setEditData({...editData, password: e.target.value})} />
            </div>
          )}
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmEdit} className="w-full" disabled={!userToEdit || (editData.cpf === userToEdit.cpf && !editData.password.trim())}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Excluir Usuário</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir o usuário com CPF <strong>{userToDelete?.cpf}</strong>?</p>
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
