import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconPlus, IconArrowLeft, IconTool } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { SpaceService, type SpaceInfo } from '@/api/spaceService'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import InputLabel from '@/components/InputLabel'
import { StatusBadge } from '@/components/StatusBadge'
import { toast } from 'sonner'

export default function AdminSpacesPage() {
  const navigate = useNavigate()

  const [spaces, setSpaces] = useState<SpaceInfo[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [spaceToEdit, setSpaceToEdit] = useState<SpaceInfo | null>(null)
  const [spaceToDelete, setSpaceToDelete] = useState<SpaceInfo | null>(null)
  const [spaceForMaintenance, setSpaceForMaintenance] = useState<SpaceInfo | null>(null)
  const [maintenanceAction, setMaintenanceAction] = useState<'close' | 'reopen' | null>(null)

  const [createData, setCreateData] = useState({ name: '', description: '', capacity: '' })
  const [createCapacityError, setCreateCapacityError] = useState<string | undefined>()
  const [editCapacityError, setEditCapacityError] = useState<string | undefined>()
  const [editData, setEditData] = useState({ name: '', description: '', capacity: '' })

  const fetchSpaces = () => SpaceService.listSpaces().then(res => {
    console.log("Fetched spaces:", res);
    setSpaces(res);
  }).catch(console.error)

  useEffect(() => {
    fetchSpaces()
  }, [])

  const adminCpf = localStorage.getItem('cpf') || ''

  const handleConfirmCreate = async () => {
    const cap = Number(createData.capacity)
    if (!createData.capacity || !Number.isInteger(cap) || cap <= 0) {
      setCreateCapacityError("A capacidade máxima deve ser um número inteiro maior que 0.")
      return
    }
    try {
      await SpaceService.registerSpace(adminCpf, createData.name, createData.description, cap)
      toast.success("Espaço adicionado com sucesso!")
      setCreateData({ name: '', description: '', capacity: '' })
      setCreateCapacityError(undefined)
      setIsCreateOpen(false)
      fetchSpaces()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmEdit = async () => {
    if (!spaceToEdit) return
    if (editData.capacity) {
      const cap = Number(editData.capacity)
      if (!Number.isInteger(cap) || cap <= 0) {
        setEditCapacityError("A capacidade máxima deve ser um número inteiro maior que 0.")
        return
      }
    }
    try {
      await SpaceService.updateSpace(adminCpf, spaceToEdit.id, editData.name || undefined, editData.description || undefined, editData.capacity ? Number(editData.capacity) : undefined)
      toast.success(`Espaço ${spaceToEdit.nome} atualizado com sucesso!`)
      setSpaceToEdit(null)
      setEditCapacityError(undefined)
      fetchSpaces()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmDelete = async () => {
    if (!spaceToDelete) return
    try {
      await SpaceService.deleteSpace(adminCpf, spaceToDelete.id)
      toast.success(`Espaço ${spaceToDelete.nome} excluído!`)
      setSpaceToDelete(null)
      fetchSpaces()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmMaintenance = async () => {
    if (!spaceForMaintenance || !maintenanceAction) return
    const id = spaceForMaintenance.id
    try {
      if (maintenanceAction === 'close') {
        const res = await SpaceService.closeSpace(adminCpf, id)
        if (res.sucesso) {
          toast.success("Espaço fechado para manutenção!")
          fetchSpaces()
        } else {
          toast.error("Erro ao fechar espaço: " + res.mensagem)
        }
      } else {
        const res = await SpaceService.reopenSpace(adminCpf, id)
        if (res.sucesso) {
          toast.success("Espaço reaberto com sucesso!")
          fetchSpaces()
        } else {
          toast.error("Erro ao reabrir espaço: " + res.mensagem)
        }
      }
    } catch(e: any) {
      console.error(e)
    } finally {
      setSpaceForMaintenance(null)
      setMaintenanceAction(null)
    }
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
        {spaces.map((space) => (
          <Card key={space.id}>
            <CardContent className="p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <p className="font-medium">{space.nome}</p>
                <p className="text-sm text-muted-foreground mb-1">Capacidade: {space.capacidadeMaxima}</p>
                <StatusBadge status={space.status} />
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-2 w-full justify-start" onClick={() => { setSpaceToEdit(space); setEditData({ name: space.nome, description: space.descricao || '', capacity: String(space.capacidadeMaxima) }) }}>
                  <IconEdit size={16}/> Editar
                </Button>
                {space.status === 'Em manutenção' ? (
                  <Button variant="secondary" size="sm" className="gap-2 w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:text-emerald-300" onClick={() => { setSpaceForMaintenance(space); setMaintenanceAction('reopen') }}>
                    <IconTool size={16}/> Reabrir
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="gap-2 w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300" onClick={() => { setSpaceForMaintenance(space); setMaintenanceAction('close') }}>
                    <IconTool size={16}/> Manutenção
                  </Button>
                )}
                <Button variant="destructive" size="sm" className="gap-2 w-full justify-start" onClick={() => setSpaceToDelete(space)}>
                  <IconTrash size={16}/> Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={(open) => { setIsCreateOpen(open); if (!open) { setCreateData({ name: '', description: '', capacity: '' }); setCreateCapacityError(undefined); } }}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Espaço</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <InputLabel label="Nome" placeholder="Nome do espaço" value={createData.name} onChange={(e) => setCreateData({...createData, name: e.target.value})} />
            <InputLabel label="Descrição" placeholder="Descrição opcional" value={createData.description} onChange={(e) => setCreateData({...createData, description: e.target.value})} />
            <InputLabel label="Capacidade" type="number" placeholder="Capacidade máxima" value={createData.capacity} error={createCapacityError} onChange={(e) => { setCreateData({...createData, capacity: e.target.value}); setCreateCapacityError(undefined); }} />
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmCreate} className="w-full" disabled={!createData.name.trim() || !createData.capacity.trim()}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!spaceToEdit} onOpenChange={(open) => { if (!open) { setSpaceToEdit(null); setEditCapacityError(undefined); } }}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Espaço</DialogTitle>
          </DialogHeader>
          {spaceToEdit && (
            <div className="flex flex-col gap-3 py-4">
              <InputLabel label="Nome" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
              <InputLabel label="Descrição" value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} />
              <InputLabel label="Capacidade" type="number" value={editData.capacity} error={editCapacityError} onChange={(e) => { setEditData({...editData, capacity: e.target.value}); setEditCapacityError(undefined); }} />
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select defaultValue={spaceToEdit.status}>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
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

      <Dialog open={!!spaceForMaintenance} onOpenChange={(open) => !open && (setSpaceForMaintenance(null), setMaintenanceAction(null))}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {maintenanceAction === 'close' ? 'Enviar para Manutenção' : 'Reabrir Espaço'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <p>Tem certeza que deseja {maintenanceAction === 'close' ? 'enviar para manutenção' : 'reabrir'} o espaço <strong>{spaceForMaintenance?.nome}</strong>?</p>
            {maintenanceAction === 'close' && (
              <p className="text-sm text-muted-foreground font-medium text-amber-800 dark:text-amber-400">
                Isso impedirá novas reservas para este espaço até que ele seja reaberto.
              </p>
            )}
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleConfirmMaintenance} className="w-full">Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
