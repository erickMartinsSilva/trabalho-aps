import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconPlus, IconArrowLeft, IconTool } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { EspacoService, type EspacoInfo } from '@/api/espacoService'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import InputLabel from '@/components/InputLabel'
import { StatusBadge } from '@/components/StatusBadge'
import { toast } from 'sonner'


export default function AdminSpacesPage() {
  const navigate = useNavigate()

  const [spaces, setSpaces] = useState<EspacoInfo[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [spaceToEdit, setSpaceToEdit] = useState<EspacoInfo | null>(null)
  const [spaceToDelete, setSpaceToDelete] = useState<EspacoInfo | null>(null)

  const [createData, setCreateData] = useState({ nome: '', descricao: '', capacidade: '' })
  const [editData, setEditData] = useState({ nome: '', descricao: '', capacidade: '' })

  const fetchSpaces = () => EspacoService.listarEspacos().then(res => {
    console.log("Fetched spaces:", res);
    setSpaces(res);
  }).catch(console.error)

  useEffect(() => {
    fetchSpaces()
  }, [])

  const adminCpf = localStorage.getItem('cpf') || ''

  const handleConfirmCreate = async () => {
    try {
      await EspacoService.cadastrarEspaco(adminCpf, createData.nome, createData.descricao, Number(createData.capacidade))
      toast.success("Espaço adicionado com sucesso!")
      setIsCreateOpen(false)
      fetchSpaces()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmEdit = async () => {
    if (!spaceToEdit) return
    try {
      await EspacoService.atualizarEspaco(adminCpf, spaceToEdit.id, editData.nome || undefined, editData.descricao || undefined, editData.capacidade ? Number(editData.capacidade) : undefined)
      toast.success(`Espaço ${spaceToEdit.nome} atualizado com sucesso!`)
      setSpaceToEdit(null)
      fetchSpaces()
    } catch(e: any) { console.error(e) }
  }

  const handleConfirmDelete = async () => {
    if (!spaceToDelete) return
    try {
      await EspacoService.deletarEspaco(adminCpf, spaceToDelete.id)
      toast.success(`Espaço ${spaceToDelete.nome} excluído!`)
      setSpaceToDelete(null)
      fetchSpaces()
    } catch(e: any) { console.error(e) }
  }

  const handleFecharEspaco = async (id: number) => {
    try {
      const res = await EspacoService.fecharEspaco(adminCpf, id)
      if (res.sucesso) {
        toast.success("Espaço fechado para manutenção!")
        fetchSpaces()
      } else {
        toast.error("Erro ao fechar espaço: " + res.mensagem)
      }
    } catch(e: any) { console.error(e) }
  }

  const handleReabrirEspaco = async (id: number) => {
    try {
      const res = await EspacoService.reabrirEspaco(adminCpf, id)
      if (res.sucesso) {
        toast.success("Espaço reaberto com sucesso!")
        fetchSpaces()
      } else {
        toast.error("Erro ao reabrir espaço: " + res.mensagem)
      }
    } catch(e: any) { console.error(e) }
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
        {spaces.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-4 flex justify-between items-center gap-2">
              <div className="flex-1">
                <p className="font-medium">{s.nome}</p>
                <p className="text-sm text-muted-foreground mb-1">Capacidade: {s.capacidadeMaxima}</p>
                <StatusBadge status={s.status} />
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-2 w-full justify-start" onClick={() => { setSpaceToEdit(s); setEditData({ nome: s.nome, descricao: s.descricao || '', capacidade: String(s.capacidadeMaxima) }) }}>
                  <IconEdit size={16}/> Editar
                </Button>
                {s.status === 'Em manutenção' ? (
                  <Button variant="secondary" size="sm" className="gap-2 w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:text-emerald-300" onClick={() => handleReabrirEspaco(s.id)}>
                    <IconTool size={16}/> Reabrir
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="gap-2 w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300" onClick={() => handleFecharEspaco(s.id)}>
                    <IconTool size={16}/> Manutenção
                  </Button>
                )}
                <Button variant="destructive" size="sm" className="gap-2 w-full justify-start" onClick={() => setSpaceToDelete(s)}>
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
            <InputLabel label="Nome" placeholder="Nome do espaço" value={createData.nome} onChange={(e) => setCreateData({...createData, nome: e.target.value})} />
            <InputLabel label="Descrição" placeholder="Descrição opcional" value={createData.descricao} onChange={(e) => setCreateData({...createData, descricao: e.target.value})} />
            <InputLabel label="Capacidade" type="number" placeholder="Capacidade máxima" value={createData.capacidade} onChange={(e) => setCreateData({...createData, capacidade: e.target.value})} />
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
              <InputLabel label="Nome" value={editData.nome} onChange={(e) => setEditData({...editData, nome: e.target.value})} />
              <InputLabel label="Descrição" value={editData.descricao} onChange={(e) => setEditData({...editData, descricao: e.target.value})} />
              <InputLabel label="Capacidade" type="number" value={editData.capacidade} onChange={(e) => setEditData({...editData, capacidade: e.target.value})} />
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
