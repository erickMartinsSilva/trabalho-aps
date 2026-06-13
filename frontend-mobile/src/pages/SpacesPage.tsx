import { SpaceCard } from '@/components/SpaceCard'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EspacoStatus, type EspacoStatusValue } from '@/models'
import { ESPACOS } from '@/data'
import { SelectLabel } from '@/components/ui/select'
import { useMemo, useState, useRef } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SpaceFilters {
  status: string
  capacity: string
}

export default function SpacesPage() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedFilters, setSelectedFilters] = useState<SpaceFilters>({
    status: "Todos",
    capacity: "Todos"
  })

  const searchInputRef = useRef<HTMLInputElement>(null)

  const clearSearchValue = () => {
    setSearchValue("")
    if (searchInputRef.current) {
      searchInputRef.current.value = ""
    }
  }

  const clearFilters = () => {
    setSelectedFilters({
      status: "Todos",
      capacity: "Todos"
    })
  }

  const clearAllQueries = () => {
    clearSearchValue()
    clearFilters()
  }

  const filteredSpaces = useMemo(() => {
    const status = selectedFilters.status
    const capacity = selectedFilters.capacity

    return ESPACOS.filter((s) => {
      const searchValueMatchesName = s.nome.toLowerCase().includes(searchValue.toLowerCase())
      const searchValueMatchesCode = s.id === Number(searchValue)

      const searchValueMatches = searchValueMatchesName || searchValueMatchesCode

      const selectedFilterMatchesStatus = status !== "Todos"
        ? s.status === status as EspacoStatusValue
        : true
      const selectedFilterMatchesCapacity = capacity !== "Todos"
        ? s.capacidadeMaxima === Number(capacity)
        : true

      const filtersMatch = selectedFilterMatchesStatus && selectedFilterMatchesCapacity

      return searchValueMatches && filtersMatch
    })
  }, [searchValue, selectedFilters])

  const noSearchResults = filteredSpaces.length === 0

  const allSpaceCapacitiesSet = new Set(ESPACOS.sort((a, b) => a.capacidadeMaxima - b.capacidadeMaxima).map((s) => s.capacidadeMaxima))

  return (
    <div className="flex-1 flex flex-col px-4 pt-6 space-y-4 overflow-hidden">
      <h1 className="text-[22px] font-medium">Espaços</h1>

      <InputGroup>
        <InputGroupInput ref={searchInputRef} value={searchValue} placeholder="Buscar (nome, código...)" onChange={(e) => setSearchValue(e.target.value)} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon hidden={!searchValue} align='inline-end' onClick={clearSearchValue}>
          <X />
        </InputGroupAddon>
      </InputGroup>

      <h3>Filtrar por:</h3>
      <div className='flex justify-between gap-2'>
        <div className='w-full flex flex-col gap-2'>
          <Label htmlFor='status-filter'>Status</Label>
          <Select id='status-filter' value={selectedFilters.status} onValueChange={(v) => setSelectedFilters({ ...selectedFilters, status: v || "Todos" })}>
            <SelectTrigger className="w-full min-w-0">
              <SelectValue className="min-w-0" placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value={"Todos"}>Todos</SelectItem>
                {Object.entries(EspacoStatus).map(([key, value]) => (
                  <SelectItem key={key} value={value}>{value}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <Label htmlFor='capacity-filter'>Capacidade máxima</Label>
          <Select id='capacity-filter' value={selectedFilters.capacity} onValueChange={(v) => setSelectedFilters({ ...selectedFilters, capacity: v || "Todos" })}>
            <SelectTrigger className="w-full min-w-0">
              <SelectValue className="min-w-0" placeholder="Cap. Máxima" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Capacidade máxima</SelectLabel>
                <SelectItem value={"Todos"}>Todos</SelectItem>
                {Array.from(allSpaceCapacitiesSet).map((c, idx) => (
                  <SelectItem key={idx} value={c}>{c}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {noSearchResults &&
          <div className='flex flex-col gap-2 text-center'>
            <p className='text-center'>Nenhum resultado encontrado para a busca.</p>
            <Button variant='outline' className="m-auto" onClick={clearAllQueries}>
              Limpar filtros de busca
            </Button>
          </div>
        }
        {filteredSpaces.map((s) => (
          <SpaceCard key={s.id} {...s}/>
        ))}
      </div>
    </div>
  )
}
