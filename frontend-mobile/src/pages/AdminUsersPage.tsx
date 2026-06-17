import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconPlus, IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { UsuarioService, type UsuarioInfo } from '@/api/usuarioService'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import InputLabel from '@/components/InputLabel'
import { toast } from 'sonner'

export default function AdminUsersPage() {
  const navigate = useNavigate()
  
  const [users, setUsers] = useState<UsuarioInfo[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<UsuarioInfo | null>(null)
  const [userToDelete, setUserToDelete] = useState<UsuarioInfo | null>(null)

  const [createData, setCreateData] = useState({ cpf: '', senha: '' })
  const [editData, setEditData] = useState({ cpf: '', senha: '' })

  const fetchUsers = () => UsuarioService.listarUsuarios().then(setUsers).catch(console.error)

  useEffect(() => { fetchUsers() }, [])

  const handleConfirmCreate = async () => {
    try {
      await UsuarioService.cadastrarUsuario(createData.cpf, createData.senha)
      toast.success("Usuário adicionado com sucesso!")
      setIsCreateOpen(false)
      fetchUsers()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmEdit = async () => {
    if(!userToEdit) return
    const cpfChanged = editData.cpf !== userToEdit.cpf
    const passwordChanged = editData.senha.trim().length > 0

    if (!cpfChanged && !passwordChanged) {
      toast.error("Nenhuma alteração informada.")
      return
    }

    try {
      const res = await UsuarioService.atualizarUsuario(
        userToEdit.cpf,
        cpfChanged ? editData.cpf : undefined,
        passwordChanged ? editData.senha : undefined
      )
      if (res.sucesso) {
        toast.success(`Usuário atualizado com sucesso!`)
        setUserToEdit(null)
        setEditData({ cpf: '', senha: '' })
        fetchUsers()
      } else {
        toast.error(`Erro ao atualizar: ${res.mensagem}`)
      }
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmDelete = async () => {
    if(!userToDelete) return
    try {
      await UsuarioService.deletarUsuario(userToDelete.cpf)
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
        {users.map((u) => (
          <Card key={u.cpf}>
            <CardContent className="p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <p className="font-medium">CPF: {u.cpf}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => { setUserToEdit(u); setEditData({ cpf: u.cpf, senha: '' }) }}>
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
            <InputLabel label="CPF" placeholder="Apenas números" value={createData.cpf} onChange={(e) => setCreateData({...createData, cpf: e.target.value})} />
            <InputLabel label="Senha" type="password" placeholder="Senha" value={createData.senha} onChange={(e) => setCreateData({...createData, senha: e.target.value})} />
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
      <Dialog open={!!userToEdit} onOpenChange={(open) => { if (!open) { setUserToEdit(null); setEditData({ cpf: '', senha: '' }); } }}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          {userToEdit && (
            <div className="flex flex-col gap-3 py-4">
              <InputLabel label="CPF" value={editData.cpf} onChange={(e) => setEditData({...editData, cpf: e.target.value})} />
              <InputLabel label="Nova Senha" type="password" placeholder="Insira a nova senha" value={editData.senha} onChange={(e) => setEditData({...editData, senha: e.target.value})} />
            </div>
          )}
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmEdit} className="w-full" disabled={!userToEdit || (editData.cpf === userToEdit.cpf && !editData.senha.trim())}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
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
