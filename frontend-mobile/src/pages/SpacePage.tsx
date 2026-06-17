import { StatusBadge } from "@/components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EspacoService, type EspacoInfo } from "@/api/espacoService"
import { ReservaService } from "@/api/reservaService"
import { ChevronDownIcon, UsersIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import InputLabel from "@/components/InputLabel"
import { EspacoStatus } from "@/models"
import { isTimeInPast } from "@/utils"

interface SpaceFormData {
  data: Date | undefined
  horaInicio: string
  horaFim: string
}

export default function SpacePage() {
  const [formData, setFormData] = useState<SpaceFormData>({
    data: undefined,
    horaInicio: "",
    horaFim: ""
  })
  const [errors, setErrors] = useState<{data: string, horaInicio: string, horaFim: string}>({
    data: "",
    horaInicio: "",
    horaFim: ""
  })
  const navigate = useNavigate()
  const { id } = useParams()
  const [space, setSpace] = useState<EspacoInfo | null>(null)

  useEffect(() => {
    if (id) {
      EspacoService.buscarEspaco(Number(id))
        .then(res => setSpace(res.espaco))
        .catch(err => console.error(err))
    }
  }, [id])

  const onSubmit = async () => {
    const { valid, formErrors } = validateFormSubmission(formData)
    if(!valid) {
      setErrors(formErrors)
      return
    }

    const [hInicio, mInicio] = formData.horaInicio.split(':')
    const [hFim, mFim] = formData.horaFim.split(':')
    const start = new Date(formData.data!)
    start.setHours(Number(hInicio), Number(mInicio), 0)
    const end = new Date(formData.data!)
    end.setHours(Number(hFim), Number(mFim), 0)

    const cpf = localStorage.getItem('cpf')
    if (!cpf) {
      alert("Erro: CPF não encontrado no login")
      return
    }

    try {
      const res = await ReservaService.reservarEspaco(
        cpf,
        Number(id),
        start.toISOString(),
        end.toISOString()
      )
      if (res.sucesso) {
        alert("Reserva feita com sucesso!")
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      } else {
        alert("Erro ao reservar: " + res.mensagem)
      }
    } catch (err: any) {
      alert("Erro de API: " + err.message)
    }
  }

  const validateFormSubmission = (formData: SpaceFormData) => {
    const newErrors = {
      data: "",
      horaInicio: "",
      horaFim: ""
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dateInPast = formData.data ? today.getTime() > formData.data.getTime() : false
    if(dateInPast) {
      newErrors.data = "Data da reserva não pode estar no passado"
      return {
        valid: false,
        formErrors: newErrors
      }
    }

    let hourErrorMessage = ""
    const startHourAfterEndHour = formData.horaFim < formData.horaInicio
    if(startHourAfterEndHour) {
      hourErrorMessage = "Hora de início não pode estar depois da hora de fim"
      newErrors.horaInicio = hourErrorMessage
    }
    const horaInicioInPast = formData.data ? isTimeInPast(formData.data, formData.horaInicio) : false
    const horaFimInPast = formData.data ? isTimeInPast(formData.data, formData.horaFim) : false
    if(horaInicioInPast) {
      hourErrorMessage = "Horário não pode estar no passado"
      newErrors.horaInicio = hourErrorMessage
    }
    if(horaFimInPast) {
      hourErrorMessage = "Horário não pode estar no passado"
      newErrors.horaFim = hourErrorMessage
    }

    return {
      valid: newErrors.data === "" && newErrors.horaInicio === "" && newErrors.horaFim === "",
      formErrors: newErrors
    }
  }
  
  const spaceInMaintenance = space?.status === EspacoStatus.MANUTENCAO
  const formSubmittable = (!!formData.data && !!formData.horaInicio && !!formData.horaFim) && !spaceInMaintenance
  
  if(!space) {
    return (
      <div className="m-auto flex flex-col gap-2 justify-center items-center text-center">
        <h2>Ops!</h2>
        <p>O espaço informado não existe.</p>
        <Button variant="outline" onClick={() => navigate('/home')}>Voltar para a tela inicial</Button>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 space-y-4 overflow-hidden">
      <Card className="px-4 m-auto shadow-2xl">
        <div className="flex justify-between">
          <h2>{space.nome}</h2>
  
          <div className="flex gap-2">
            <StatusBadge status={space.status}/>
          </div>
        </div>
        
        <section className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h3>Informações</h3>  
            <div className="flex gap-1">
              <UsersIcon/>
              <p className="text-lg">{space.capacidadeMaxima}</p>
            </div>
          </div>
          {space.descricao && <p className="text-sm text-muted-foreground">{space.descricao}</p>}
        </section>
        
        <form>
          <div className="grid grid-cols-3 gap-2 my-2 justify-between">
            <div className="flex flex-col gap-2 w-full">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger disabled={spaceInMaintenance}>
                  <Button
                    disabled={spaceInMaintenance}
                    variant="outline"
                    className={`w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${errors.data && "border-red-500 text-red-500"}`}
                  >
                    {formData.data ? format(formData.data, "P") : <span>--/--/--</span>}
                    <ChevronDownIcon />
                  </Button>
                  {errors.data && <p className="mt-2 text-left text-xs font-bold text-red-500">{errors.data}</p>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={formData.data}
                    onSelect={(s) => {
                      setFormData({...formData, data: s})
                      setErrors({...errors, data: ""})
                    }}
                    mode="single"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <InputLabel
                disabled={spaceInMaintenance}
                label="Hora de Início"
                type="time"
                step="60"
                value={formData.horaInicio}
                error={errors.horaInicio}
                onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                onInput={() => setErrors({ ...errors, horaInicio: "" })}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <InputLabel
                disabled={spaceInMaintenance}
                label="Hora de Fim"
                type="time"
                value={formData.horaFim}
                error={errors.horaFim}
                onChange={(e) => setFormData({ ...formData, horaFim: e.target.value })}
                onInput={() => setErrors({ ...errors, horaFim: "" })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button type="button" size="lg" variant="outline" onClick={() => navigate(-1)}>
              Voltar
            </Button>

            <Button size="lg" className={"col-start-3"} disabled={!formSubmittable} onClick={onSubmit}>
              Reservar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}