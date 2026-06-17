import { useState, useEffect } from 'react'
import InputLabel from '@/components/InputLabel'
import { isValidCpf, isTimeInPast } from '@/utils'
import { IconCalendarPlus, IconBuilding, IconClock, IconIdBadge2, IconCheck } from '@tabler/icons-react'
import { SpaceService } from '@/api/spaceService'
import { BookingService } from '@/api/bookingService'
import type { SpaceInfo } from '@/models'
import { toast } from 'sonner'

export default function FutureBookingPage() {
  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 1)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    spaceId: '',
    date: formatDate(today),
    startTime: '',
    endTime: '',
    responsibleCpf: ''
  })
  
  const [errors, setErrors] = useState({
    date: '',
    startTime: '',
    endTime: '',
    responsibleCpf: ''
  })

  const [spaces, setSpaces] = useState<SpaceInfo[]>([])

  useEffect(() => {
    SpaceService.listSpaces()
      .then(setSpaces)
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = {
      date: '',
      startTime: '',
      endTime: '',
      responsibleCpf: ''
    }

    const cleanedCpf = formData.responsibleCpf.replace(/\D/g, '')
    if (!isValidCpf(cleanedCpf)) {
      newErrors.responsibleCpf = 'O CPF informado é inválido.'
    }

    const todayMidnight = new Date()
    todayMidnight.setHours(0, 0, 0, 0)
    
    const [year, month, day] = formData.date.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    
    if (selectedDate.getTime() < todayMidnight.getTime()) {
      newErrors.date = 'Data da reserva não pode estar no passado'
    }

    if (formData.startTime && formData.endTime && formData.endTime < formData.startTime) {
      newErrors.startTime = 'Hora de início não pode estar depois da hora de fim'
    }

    if (formData.startTime && isTimeInPast(selectedDate, formData.startTime)) {
      newErrors.startTime = 'Horário não pode estar no passado'
    }

    if (formData.endTime && isTimeInPast(selectedDate, formData.endTime)) {
      newErrors.endTime = 'Horário não pode estar no passado'
    }

    if (newErrors.date || newErrors.startTime || newErrors.endTime || newErrors.responsibleCpf) {
      setErrors(newErrors)
      return
    }

    setErrors({
      date: '',
      startTime: '',
      endTime: '',
      responsibleCpf: ''
    })

    const [startHour, startMin] = formData.startTime.split(':').map(Number)
    const [endHour, endMin] = formData.endTime.split(':').map(Number)

    const startDate = new Date(year, month - 1, day, startHour, startMin)
    const endDate = new Date(year, month - 1, day, endHour, endMin)

    try {
      const res = await BookingService.bookSpace(
        cleanedCpf,
        Number(formData.spaceId),
        startDate.toISOString(),
        endDate.toISOString()
      )
      if (res.sucesso) {
        toast.success(res.mensagem || 'Reserva realizada com sucesso!')
        setFormData({
          spaceId: '',
          date: formatDate(today),
          startTime: '',
          endTime: '',
          responsibleCpf: ''
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
                value={formData.spaceId}
                onChange={e => setFormData({ ...formData, spaceId: e.target.value })}
                required
              >
                <option value="" disabled>Selecione a sala ou área...</option>
                {spaces.filter(s => s.status !== 'Em manutenção').map(space => (
                  <option key={space.id} value={space.id}>
                    {space.nome} (Capacidade: {space.capacidadeMaxima} pessoas)
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
              value={formData.date}
              onChange={e => {
                setFormData({ ...formData, date: e.target.value })
                setErrors(prev => ({ ...prev, date: '' }))
              }}
              error={errors.date}
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
                  value={formData.startTime}
                  onChange={e => {
                    setFormData({ ...formData, startTime: e.target.value })
                    setErrors(prev => ({ ...prev, startTime: '' }))
                  }}
                  error={errors.startTime}
                  className="h-12 text-[15px]"
                  required
                />
                <InputLabel
                  id="hora-termino"
                  label="Término"
                  type="time"
                  value={formData.endTime}
                  onChange={e => {
                    setFormData({ ...formData, endTime: e.target.value })
                    setErrors(prev => ({ ...prev, endTime: '' }))
                  }}
                  error={errors.endTime}
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
                  value={formData.responsibleCpf}
                  onChange={e => {
                    setFormData({ ...formData, responsibleCpf: e.target.value })
                    setErrors(prev => ({ ...prev, responsibleCpf: '' }))
                  }}
                  error={errors.responsibleCpf}
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