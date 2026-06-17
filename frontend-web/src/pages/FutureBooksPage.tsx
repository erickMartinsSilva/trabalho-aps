import { useState } from 'react'
import InputLabel from '@/components/InputLabel'
import { ESPACOS } from '@/data'
import { cpfValido } from '@/utils'
import { IconCalendarPlus, IconBuilding, IconClock, IconIdBadge2, IconCheck } from '@tabler/icons-react'

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
  
  const [cpfError, setCpfError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cpfLimpo = formData.cpfResponsavel.replace(/\D/g, '')
    if (!cpfValido(cpfLimpo)) {
      setCpfError('O CPF informado é inválido.')
      return
    }
    setCpfError('')
    alert('Agendamento realizado com sucesso!')
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
                Novo Agendamento
              </h1>
              <p className="text-[17px] text-[#5F5E5A] mt-1">
                Utilize o painel abaixo para reservar dependências mediante CPF.
              </p>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white border border-[#ECEAE4] rounded-2xl p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-[#1A5C8A] dark:text-[#E8F2FA] font-semibold border-b border-[#ECEAE4] pb-4">
              <IconBuilding size={24} />
              <span className="text-lg">Localização e Data</span>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="espaco" className="text-[15px] font-medium text-[#5F5E5A]">Espaço Requisitado</label>
              <select
                id="espaco"
                className="flex h-12 w-full rounded-lg border border-[#B4B2A9] bg-white px-4 py-2 text-[15px] focus:ring-2 focus:ring-[#1A5C8A] outline-none transition-all cursor-pointer"
                value={formData.espacoId}
                onChange={e => setFormData({ ...formData, espacoId: e.target.value })}
                required
              >
                <option value="" disabled>Selecione a sala ou área...</option>
                {ESPACOS.filter(e => e.status !== 'Em manutenção').map(espaco => (
                  <option key={espaco.id} value={espaco.id}>
                    {espaco.nome} (Capacidade: {espaco.capacidadeMaxima} pessoas)
                  </option>
                ))}
              </select>
            </div>

            <InputLabel
              id="data-reserva"
              label="Data do Agendamento"
              type="date"
              min={formatDate(today)}
              max={formatDate(maxDate)}
              value={formData.data}
              onChange={e => setFormData({ ...formData, data: e.target.value })}
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
                  onChange={e => setFormData({ ...formData, horaInicio: e.target.value })}
                  className="h-12 text-[15px]"
                  required
                />
                <InputLabel
                  id="hora-termino"
                  label="Término"
                  type="time"
                  value={formData.horaTermino}
                  onChange={e => setFormData({ ...formData, horaTermino: e.target.value })}
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
                  maxLength={14}
                  value={formData.cpfResponsavel}
                  onChange={e => {
                    setFormData({ ...formData, cpfResponsavel: e.target.value })
                    if (cpfError) setCpfError('')
                  }}
                  error={cpfError}
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