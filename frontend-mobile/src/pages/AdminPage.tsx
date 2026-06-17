import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { IconLogout, IconUsers, IconBuildingCommunity, IconCalendarEvent } from '@tabler/icons-react'
import { useNavigate } from 'react-router'
import { clearSession } from '@/utils'

export default function AdminPage() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-medium text-foreground mt-0.5">Painel do Administrador</h1>
          <p className="text-sm text-muted-foreground mt-1">Gerencie o sistema</p>
        </div>
        <div className="flex gap-2">
          <Button id="btn-logout" variant="ghost" size="icon" aria-label="Sair" onClick={() => { clearSession(); navigate('/'); }} className="rounded-full min-h-[48px] min-w-[48px] text-destructive hover:bg-destructive/10">
            <IconLogout size={22} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center overflow-hidden space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-md cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate('/admin/spaces')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2 h-full">
              <IconBuildingCommunity className="text-primary" size={28} />
              <p className="text-sm font-medium">Gerenciar Espaços</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-md cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate('/admin/bookings')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2 h-full">
              <IconCalendarEvent className="text-primary" size={28} />
              <p className="text-sm font-medium">Gerenciar Reservas</p>
            </CardContent>
          </Card>

          <Card className="rounded-md cursor-pointer hover:bg-muted/50 transition-colors col-span-2" onClick={() => navigate('/admin/users')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2 h-full">
              <IconUsers className="text-primary" size={28} />
              <p className="text-sm font-medium">Gerenciar Usuários</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
