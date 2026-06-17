import { StatusBadge } from "@/components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SpaceService, type SpaceInfo } from "@/api/spaceService"
import { BookingService } from "@/api/bookingService"
import { ChevronDownIcon, UsersIcon } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import InputLabel from "@/components/InputLabel"
import { SpaceStatus } from "@/models"
import { isTimeInPast } from "@/utils"
import { toast } from 'sonner'

interface SpaceFormData {
  date: Date | undefined
  startTime: string
  endTime: string
}

export default function SpacePage() {
  const [formData, setFormData] = useState<SpaceFormData>({
    date: undefined,
    startTime: "",
    endTime: ""
  })
  const [errors, setErrors] = useState<{date: string, startTime: string, endTime: string}>({
    date: "",
    startTime: "",
    endTime: ""
  })
  const navigate = useNavigate()
  const { id } = useParams()
  const [space, setSpace] = useState<SpaceInfo | null>(null)

  useEffect(() => {
    if (id) {
      SpaceService.getSpace(Number(id))
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

    const [startHour, startMin] = formData.startTime.split(':')
    const [endHour, endMin] = formData.endTime.split(':')
    const start = new Date(formData.date!)
    start.setHours(Number(startHour), Number(startMin), 0)
    const end = new Date(formData.date!)
    end.setHours(Number(endHour), Number(endMin), 0)

    const cpf = localStorage.getItem('cpf')
    if (!cpf) {
      toast.error("Erro: CPF não encontrado no login")
      return
    }

    try {
      const res = await BookingService.bookSpace(
        cpf,
        Number(id),
        start.toISOString(),
        end.toISOString()
      )
      if (res.sucesso) {
        toast.success("Reserva feita com sucesso!")
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      } else {
        toast.error("Erro ao reservar: " + res.mensagem)
      }
    } catch (err: any) {
      console.error(err)
    }
  }

  const validateFormSubmission = (formData: SpaceFormData) => {
    const newErrors = {
      date: "",
      startTime: "",
      endTime: ""
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dateInPast = formData.date ? today.getTime() > formData.date.getTime() : false
    if(dateInPast) {
      newErrors.date = "Data da reserva não pode estar no passado"
      return {
        valid: false,
        formErrors: newErrors
      }
    }

    let hourErrorMessage = ""
    const startHourAfterEndHour = formData.endTime < formData.startTime
    if(startHourAfterEndHour) {
      hourErrorMessage = "Hora de início não pode estar depois da hora de fim"
      newErrors.startTime = hourErrorMessage
    }
    const startTimeInPast = formData.date ? isTimeInPast(formData.date, formData.startTime) : false
    const endTimeInPast = formData.date ? isTimeInPast(formData.date, formData.endTime) : false
    if(startTimeInPast) {
      hourErrorMessage = "Horário não pode estar no passado"
      newErrors.startTime = hourErrorMessage
    }
    if(endTimeInPast) {
      hourErrorMessage = "Horário não pode estar no passado"
      newErrors.endTime = hourErrorMessage
    }

    return {
      valid: newErrors.date === "" && newErrors.startTime === "" && newErrors.endTime === "",
      formErrors: newErrors
    }
  }
  
  const spaceInMaintenance = space?.status === SpaceStatus.MANUTENCAO
  const formSubmittable = (!!formData.date && !!formData.startTime && !!formData.endTime) && !spaceInMaintenance
  
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
      <Card className="px-4 m-auto shadow-2xl w-full">
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
                    className={`w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${errors.date && "border-red-500 text-red-500"}`}
                  >
                    {formData.date ? format(formData.date, "P") : <span>--/--/--</span>}
                    <ChevronDownIcon />
                  </Button>
                  {errors.date && <p className="mt-2 text-left text-xs font-bold text-red-500">{errors.date}</p>}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={formData.date}
                    onSelect={(s) => {
                      setFormData({...formData, date: s})
                      setErrors({...errors, date: ""})
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
                value={formData.startTime}
                error={errors.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                onInput={() => setErrors({ ...errors, startTime: "" })}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <InputLabel
                disabled={spaceInMaintenance}
                label="Hora de Fim"
                type="time"
                value={formData.endTime}
                error={errors.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                onInput={() => setErrors({ ...errors, endTime: "" })}
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