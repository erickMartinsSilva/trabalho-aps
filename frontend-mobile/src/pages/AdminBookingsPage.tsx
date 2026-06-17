import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconArrowLeft, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { ReservaService, type ReservaInfo } from '@/api/reservaService'
import { EspacoService, type EspacoInfo } from '@/api/espacoService'
import { RelatorioService, type RelatorioInfo } from '@/api/relatorioService'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import InputLabel from '@/components/InputLabel'
import { StatusBadge } from '@/components/StatusBadge'

import { format } from 'date-fns'
import { toast } from 'sonner'

export default function AdminBookingsPage() {
  const navigate = useNavigate()

  const [reservas, setReservas] = useState<ReservaInfo[]>([])
  const [espacos, setEspacos] = useState<EspacoInfo[]>([])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [bookingToEdit, setBookingToEdit] = useState<ReservaInfo | null>(null)
  const [bookingToDelete, setBookingToDelete] = useState<ReservaInfo | null>(null)
  const [isReportOpen, setIsReportOpen] = useState(false)

  const [createData, setCreateData] = useState({ espacoId: '', cpf: '', dataHoraInicio: '', dataHoraTermino: '' })
  const [editData, setEditData] = useState({ dataHoraInicio: '', dataHoraTermino: '' })
  const [reportData, setReportData] = useState({ dataHoraInicio: '', dataHoraTermino: '' })
  const [reportResults, setReportResults] = useState<RelatorioInfo[] | null>(null)

  const fetchReservas = () => ReservaService.listarReservas().then(setReservas).catch(console.error)

  useEffect(() => {
    fetchReservas()
    EspacoService.listarEspacos().then(setEspacos).catch(console.error)
  }, [])

  const handleConfirmCreate = async () => {
    try {
      await ReservaService.reservarEspaco(createData.cpf, Number(createData.espacoId), new Date(createData.dataHoraInicio).toISOString(), new Date(createData.dataHoraTermino).toISOString())
      toast.success("Reserva adicionada com sucesso!")
      setIsCreateOpen(false)
      fetchReservas()
    } catch (e: any) { console.error(e) }
  }

  const handleConfirmEdit = async () => {
    if(!bookingToEdit) return
    try {
      await ReservaService.atualizarReserva(bookingToEdit.id, editData.dataHoraInicio ? new Date(editData.dataHoraInicio).toISOString() : undefined, editData.dataHoraTermino ? new Date(editData.dataHoraTermino).toISOString() : undefined)
      toast.success(`Reserva #${bookingToEdit.id} atualizada com sucesso!`)
      setBookingToEdit(null)
      fetchReservas()
    } catch (e: any) { console.error(e) }
  }

  const handleConfirmDelete = async () => {
    if(!bookingToDelete) return
    try {
      await ReservaService.deletarReserva(bookingToDelete.id)
      toast.success(`Reserva #${bookingToDelete.id} excluída!`)
      setBookingToDelete(null)
      fetchReservas()
    } catch (e: any) { console.error(e) }
  }

  const handleEmitReport = async () => {
    try {
      const report = await RelatorioService.gerarRelatorio(new Date(reportData.dataHoraInicio).toISOString(), new Date(reportData.dataHoraTermino).toISOString())
      console.log("Relatório: ", report)
      setReportResults(report)
      setIsReportOpen(false)
    } catch (e: any) { console.error(e) }
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')} className="-ml-2">
            <IconArrowLeft />
          </Button>
          <h1 className="text-[22px] font-medium">Reservas</h1>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setIsReportOpen(true)}>
            Emitir Relatório
          </Button>
          <Button size="sm" className="flex gap-1" onClick={() => setIsCreateOpen(true)}>
            <IconPlus size={16} /> Nova
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pb-4 mt-2">
        {reservas.map((r) => {
          const espaco = espacos.find(e => e.id === r.espacoId)
          return (
            <Card key={r.id}>
              <CardContent className="p-4 flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="font-medium">Reserva #{r.id}</p>
                  <p className="text-sm text-muted-foreground">{espaco?.nome}</p>
                  <p className="text-sm text-muted-foreground mb-1">{format(new Date(r.dataHoraInicio), 'dd/MM/yyyy HH:mm')} - {format(new Date(r.dataHoraTermino), 'HH:mm')}</p>
                  <StatusBadge status={r.status} />
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="gap-2 w-full" onClick={() => setBookingToEdit(r)}>
                    <IconEdit size={16}/> Editar
                  </Button>
                  <Button variant="destructive" size="sm" className="gap-2 w-full" onClick={() => setBookingToDelete(r)}>
                    <IconTrash size={16}/> Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Reserva</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <InputLabel label="CPF Usuário" type="text" placeholder="CPF" value={createData.cpf} onChange={(e) => setCreateData({...createData, cpf: e.target.value})} />
            <InputLabel label="ID do Espaço" type="number" placeholder="ID do Espaço" value={createData.espacoId} onChange={(e) => setCreateData({...createData, espacoId: e.target.value})} />
            <InputLabel label="Data de Início" type="datetime-local" value={createData.dataHoraInicio} onChange={(e) => setCreateData({...createData, dataHoraInicio: e.target.value})} />
            <InputLabel label="Data de Término" type="datetime-local" value={createData.dataHoraTermino} onChange={(e) => setCreateData({...createData, dataHoraTermino: e.target.value})} />
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
      <Dialog open={!!bookingToEdit} onOpenChange={(open) => !open && setBookingToEdit(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Editar Reserva</DialogTitle>
          </DialogHeader>
          {bookingToEdit && (
            <div className="flex flex-col gap-3 py-4">
              <InputLabel label="ID do Espaço" type="number" defaultValue={bookingToEdit.espacoId} disabled />
              <InputLabel label="Nova Data Início" type="datetime-local" value={editData.dataHoraInicio} onChange={(e) => setEditData({...editData, dataHoraInicio: e.target.value})} />
              <InputLabel label="Nova Data Término" type="datetime-local" value={editData.dataHoraTermino} onChange={(e) => setEditData({...editData, dataHoraTermino: e.target.value})} />
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select defaultValue={bookingToEdit.status}>
                  <SelectTrigger disabled>
                    <SelectValue placeholder="Status apenas reflete o backend" />
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
      <Dialog open={!!bookingToDelete} onOpenChange={(open) => !open && setBookingToDelete(null)}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Excluir Reserva</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir a reserva <strong>#{bookingToDelete?.id}</strong>?</p>
          <p className="font-bold text-red-800">Esta ação não pode ser desfeita.</p>
          <DialogFooter className="grid grid-cols-2 gap-2 mt-4">
            <DialogClose>
              <Button variant="outline" className="w-full">Não</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleConfirmDelete} className="w-full">Sim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="w-[90vw] max-w-[350px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Emitir Relatório de Reservas</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <InputLabel label="Data de Início" type="datetime-local" value={reportData.dataHoraInicio} onChange={(e) => setReportData({...reportData, dataHoraInicio: e.target.value})} />
            <InputLabel label="Data de Término" type="datetime-local" value={reportData.dataHoraTermino} onChange={(e) => setReportData({...reportData, dataHoraTermino: e.target.value})} />
          </div>
          <DialogFooter className="grid grid-cols-2 gap-2">
            <DialogClose>
              <Button variant="outline" className="w-full">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleEmitReport} className="w-full">Gerar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Results Dialog */}
      <Dialog open={reportResults !== null} onOpenChange={(open) => !open && setReportResults(null)}>
        <DialogContent className="w-[90vw] max-w-[450px] max-h-[80vh] flex flex-col rounded-lg">
          <DialogHeader>
            <DialogTitle>Relatório de Reservas</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {reportResults && reportResults.length === 0 ? (
              <p className="text-center text-muted-foreground my-6">Nenhuma reserva encontrada para o período selecionado.</p>
            ) : (
              reportResults?.map((r) => (
                <div key={r.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-semibold text-sm">Reserva #{r.id}</p>
                      <p className="text-sm font-medium text-primary">{r.nomeEspaco || `Espaço #${r.espacoId}`}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">CPF Usuário: {r.cpfUsuario}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(r.dataHoraInicio), 'dd/MM/yyyy HH:mm')} - {format(new Date(r.dataHoraTermino), 'HH:mm')}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setReportResults(null)} className="w-full">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
