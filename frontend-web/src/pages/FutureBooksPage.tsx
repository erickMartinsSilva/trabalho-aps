import { useState, useEffect } from 'react'
import InputLabel from '@/components/InputLabel'
import { cpfValido, isTimeInPast } from '@/utils'
import { IconCalendarPlus, IconBuilding, IconClock, IconIdBadge2, IconCheck } from '@tabler/icons-react'
import { EspacoService } from '@/api/espacoService'
import { ReservaService } from '@/api/reservaService'
import type { EspacoInfo } from '@/models'
import { toast } from 'sonner'

export default function FutureBookingPage() {
  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 1)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    espacoId: '',
    data: formatDate(today),
    horaInicio: '',
    horaTermino: '',
    cpfResponsavel: ''
  })
  
  const [errors, setErrors] = useState({
    data: '',
    horaInicio: '',
    horaTermino: '',
    cpfResponsavel: ''
  })

  const [espacos, setEspacos] = useState<EspacoInfo[]>([])

  useEffect(() => {
    EspacoService.listarEspacos()
      .then(setEspacos)
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = {
      data: '',
      horaInicio: '',
      horaTermino: '',
      cpfResponsavel: ''
    }

    const cpfLimpo = formData.cpfResponsavel.replace(/\D/g, '')
    if (!cpfValido(cpfLimpo)) {
      newErrors.cpfResponsavel = 'O CPF informado é inválido.'
    }

    const todayZero = new Date()
    todayZero.setHours(0, 0, 0, 0)
    
    const [year, month, day] = formData.data.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    
    if (selectedDate.getTime() < todayZero.getTime()) {
      newErrors.data = 'Data da reserva não pode estar no passado'
    }

    if (formData.horaInicio && formData.horaTermino && formData.horaTermino < formData.horaInicio) {
      newErrors.horaInicio = 'Hora de início não pode estar depois da hora de fim'
    }

    if (formData.horaInicio && isTimeInPast(selectedDate, formData.horaInicio)) {
      newErrors.horaInicio = 'Horário não pode estar no passado'
    }

    if (formData.horaTermino && isTimeInPast(selectedDate, formData.horaTermino)) {
      newErrors.horaTermino = 'Horário não pode estar no passado'
    }

    if (newErrors.data || newErrors.horaInicio || newErrors.horaTermino || newErrors.cpfResponsavel) {
      setErrors(newErrors)
      return
    }

    setErrors({
      data: '',
      horaInicio: '',
      horaTermino: '',
      cpfResponsavel: ''
    })

    const [startHour, startMin] = formData.horaInicio.split(':').map(Number)
    const [endHour, endMin] = formData.horaTermino.split(':').map(Number)

    const dataInicio = new Date(year, month - 1, day, startHour, startMin)
    const dataTermino = new Date(year, month - 1, day, endHour, endMin)

    try {
      const res = await ReservaService.reservarEspaco(
        cpfLimpo,
        Number(formData.espacoId),
        dataInicio.toISOString(),
        dataTermino.toISOString()
      )
      if (res.sucesso) {
        toast.success(res.mensagem || 'Reserva realizada com sucesso!')
        setFormData({
          espacoId: '',
          data: formatDate(today),
          horaInicio: '',
          horaTermino: '',
          cpfResponsavel: ''
        })
      } else {
        toast.error(res.mensagem || 'Erro ao realizar reserva.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex-1 w-full h-full overflow-y-auto p-10 lg:p-14">
      <div className="w-full max-w-[1200px] mx-auto space-y-10">
        
        <header className="border-b border-[#ECEAE4] pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#1A5C8A] text-white rounded-xl shadow-sm">
              <IconCalendarPlus size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-medium text-[#1A5C8A] dark:text-[#E8F2FA] tracking-tight">
                Nova Reserva
              </h1>
              {/* <p className="text-[17px] text-[#5F5E5A] mt-1">
                Utilize o painel abaixo para reservar dependências mediante CPF.
              </p> */}
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white border border-[#ECEAE4] rounded-2xl p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-[#1A5C8A] dark:text-[#E8F2FA] font-semibold border-b border-[#ECEAE4] pb-4">
              <IconBuilding size={24} />
              <span className="text-lg">Localização e Data</span>
            </div>

            <InputLabel id="espaco" label="Espaço">
              <select
                id="espaco"
                className="flex h-12 w-full rounded-lg border border-[#B4B2A9] bg-white px-4 py-2 text-[15px] focus:ring-2 focus:ring-[#1A5C8A] outline-none transition-all cursor-pointer"
                value={formData.espacoId}
                onChange={e => setFormData({ ...formData, espacoId: e.target.value })}
                required
              >
                <option value="" disabled>Selecione a sala ou área...</option>
                {espacos.filter(e => e.status !== 'Em manutenção').map(espaco => (
                  <option key={espaco.id} value={espaco.id}>
                    {espaco.nome} (Capacidade: {espaco.capacidadeMaxima} pessoas)
                  </option>
                ))}
              </select>
            </InputLabel>

            <InputLabel
              id="data-reserva"
              label="Data"
              type="date"
              min={formatDate(today)}
              max={formatDate(maxDate)}
              value={formData.data}
              onChange={e => {
                setFormData({ ...formData, data: e.target.value })
                setErrors(prev => ({ ...prev, data: '' }))
              }}
              error={errors.data}
              className="h-12 text-[15px]"
              required
            />
          </div>

          <div className="bg-white border border-[#ECEAE4] rounded-2xl p-8 shadow-sm space-y-8 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-[#1A5C8A] dark:text-[#E8F2FA] font-semibold border-b border-[#ECEAE4] pb-4">
                <IconClock size={24} />
                <span className="text-lg">Horários e Identificação</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <InputLabel
                  id="hora-inicio"
                  label="Início"
                  type="time"
                  value={formData.horaInicio}
                  onChange={e => {
                    setFormData({ ...formData, horaInicio: e.target.value })
                    setErrors(prev => ({ ...prev, horaInicio: '' }))
                  }}
                  error={errors.horaInicio}
                  className="h-12 text-[15px]"
                  required
                />
                <InputLabel
                  id="hora-termino"
                  label="Término"
                  type="time"
                  value={formData.horaTermino}
                  onChange={e => {
                    setFormData({ ...formData, horaTermino: e.target.value })
                    setErrors(prev => ({ ...prev, horaTermino: '' }))
                  }}
                  error={errors.horaTermino}
                  className="h-12 text-[15px]"
                  required
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-[#5F5E5A] font-medium mb-4">
                  <IconIdBadge2 size={20} />
                  <span>Documento do Responsável</span>
                </div>
                <InputLabel
                  id="cpf-responsavel"
                  label="CPF (apenas números)"
                  type="text"
                  placeholder="Ex: 11122233344"
                  maxLength={11}
                  value={formData.cpfResponsavel}
                  onChange={e => {
                    setFormData({ ...formData, cpfResponsavel: e.target.value })
                    setErrors(prev => ({ ...prev, cpfResponsavel: '' }))
                  }}
                  error={errors.cpfResponsavel}
                  className="h-12 text-[15px]"
                  required
                />
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full bg-[#1A5C8A] hover:bg-[#0D3A5C] text-white h-14 rounded-xl font-medium text-[17px] shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <IconCheck size={22} />
                Confirmar Reserva
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}