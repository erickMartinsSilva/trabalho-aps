import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { SpaceCard } from '@/components/SpaceCard'
import { IconSearch, IconBell, IconSettings } from '@tabler/icons-react'
import { ESPACOS } from '@/data'

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] text-muted-foreground">Bom dia 👋</p>
          <h1 className="text-[22px] font-medium text-foreground mt-0.5">Meus Espaços</h1>
        </div>
        <div className="flex gap-2">
          <Button id="btn-notifications" variant="ghost" size="icon" aria-label="Notificações" className="rounded-full min-h-[48px] min-w-[48px]">
            <IconBell size={22} aria-hidden="true" />
          </Button>
          <Button id="btn-settings" variant="ghost" size="icon" aria-label="Configurações" className="rounded-full min-h-[48px] min-w-[48px]">
            <IconSettings size={22} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Label htmlFor="search-spaces" className="sr-only">Buscar espaço</Label>
        <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <Input id="search-spaces" type="search" placeholder="Buscar espaço..." className="pl-9 h-12 rounded-sm text-[15px]" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="rounded-md">
          <CardHeader className="pb-1">
            <CardDescription className="text-[11px] uppercase tracking-[0.07em] font-medium">Disponíveis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[32px] font-medium text-[#1D9E75]">1</p>
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader className="pb-1">
            <CardDescription className="text-[11px] uppercase tracking-[0.07em] font-medium">Ocupados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[32px] font-medium text-[#A32D2D]">1</p>
          </CardContent>
        </Card>
      </div>

      <h2 id="spaces-heading" className="text-[17px] font-medium mb-3">Espaços recentes</h2>
      <section aria-labelledby="spaces-heading" className='overflow-y-auto'>
        <div className="space-y-3">
          {ESPACOS.map((s) => (
            <SpaceCard key={s.id} {...s} />
          ))}
        </div>
      </section>
    </div>
  )
}
