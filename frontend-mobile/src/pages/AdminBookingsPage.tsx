import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconArrowLeft, IconPlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { RESERVAS, ESPACOS } from '@/data'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import InputLabel from '@/components/InputLabel'
import { StatusBadge } from '@/components/StatusBadge'
import { type Reserva, ReservaStatus } from '@/models'
import { format } from 'date-fns'

export default function AdminBookingsPage() {
  const navigate = useNavigate()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [bookingToEdit, setBookingToEdit] = useState<Reserva | null>(null)
  const [bookingToDelete, setBookingToDelete] = useState<Reserva | null>(null)

  const handleConfirmCreate = () => {
    alert("Reserva adicionada com sucesso!")
    setIsCreateOpen(false)
  }

  const handleConfirmEdit = () => {
    alert(`Reserva #${bookingToEdit?.id} atualizada com sucesso!`)
    setBookingToEdit(null)
  }

  const handleConfirmDelete = () => {
    alert(`Reserva #${bookingToDelete?.id} excluída!`)
    setBookingToDelete(null)
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
        <Button size="sm" className="flex gap-1" onClick={() => setIsCreateOpen(true)}>
          <IconPlus size={16} /> Nova
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pb-4 mt-2">
        {RESERVAS.map((r) => {
          const espaco = ESPACOS.find(e => e.id === r.espacoId)
          return (
            <Card key={r.id}>
              <CardContent className="p-4 flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="font-medium">Reserva #{r.id}</p>
                  <p className="text-sm text-muted-foreground">{espaco?.nome}</p>
                  <p className="text-sm text-muted-foreground mb-1">{format(r.dataHoraInicio, 'dd/MM/yyyy HH:mm')} - {format(r.dataHoraTermino, 'HH:mm')}</p>
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
            <InputLabel label="ID do Espaço" type="number" placeholder="ID do Espaço" />
            <InputLabel label="Data de Início" type="datetime-local" />
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
              <InputLabel label="ID do Espaço" type="number" defaultValue={bookingToEdit.espacoId} />
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select defaultValue={bookingToEdit.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(ReservaStatus).map((status) => (
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
    </div>
  )
}
