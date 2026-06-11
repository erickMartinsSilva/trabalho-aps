import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'

export default function ProfilePage() {
  return (
    <div className="px-4 pt-6 space-y-6">
      <h1 className="text-[22px] font-medium">Perfil</h1>

      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="text-[17px]">Design System</CardTitle>
          <CardDescription>Tokens da identidade visual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Status badges</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="available" />
              <StatusBadge status="occupied" />
              <StatusBadge status="pending" />
              <StatusBadge status="reserved" />
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Botões</p>
            <div className="flex flex-col gap-2">
              <Button id="btn-primary"   variant="default"     className="h-12 w-full rounded-sm">Primário</Button>
              <Button id="btn-secondary" variant="secondary"   className="h-12 w-full rounded-sm">Secundário</Button>
              <Button id="btn-outline"   variant="outline"     className="h-12 w-full rounded-sm">Delineado</Button>
              <Button id="btn-ghost"     variant="ghost"       className="h-12 w-full rounded-sm">Ghost</Button>
              <Button id="btn-danger"    variant="destructive" className="h-12 w-full rounded-sm">Perigo</Button>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Campos de formulário</p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="demo-input" className="text-[13px] font-medium text-muted-foreground">Campo padrão</Label>
                <Input id="demo-input" placeholder="Placeholder..." className="h-12 rounded-sm text-[15px]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-error-input" className="text-[13px] font-medium text-muted-foreground">Campo com erro</Label>
                <Input
                  id="demo-error-input"
                  defaultValue="valor inválido"
                  aria-describedby="demo-error-msg"
                  aria-invalid="true"
                  className="h-12 rounded-sm text-[15px] border-[#A32D2D] focus-visible:ring-[#A32D2D]/20"
                />
                <p id="demo-error-msg" className="text-[13px] text-[#A32D2D]">Este campo é obrigatório.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground mb-2">Estado de carregamento</p>
            <div className="space-y-2">
              <Skeleton className="h-[88px] w-full rounded-md" />
              <Skeleton className="h-[88px] w-full rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
