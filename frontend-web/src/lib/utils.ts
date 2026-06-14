import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Função essencial do shadcn/ui para juntar classes do Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Suas funções de negócio
export function cpfValido(cpf: string): boolean {
  const regexSomenteNumeros = /^\d+$/
  const cpfFormatoValido = cpf.length === 11 && regexSomenteNumeros.test(cpf)
  if(!cpfFormatoValido) return false

  let somaPrimeiroDigito = 0, restoPrimeiroDigito = 0
  let somaSegundoDigito = 0, restoSegundoDigito = 0
  const digitos = cpf.slice(0, 9)

  for(let i: number = 0; i < digitos.length; i++) {
    somaPrimeiroDigito += Number(digitos.at(i)) * (i+1)
    somaSegundoDigito += Number(digitos.at(i)) * i
  }

  restoPrimeiroDigito = somaPrimeiroDigito % 11
  const primeiroDigitoVerificador = restoPrimeiroDigito !== 10 ? restoPrimeiroDigito : 0
  
  somaSegundoDigito += primeiroDigitoVerificador * 9
  restoSegundoDigito = somaSegundoDigito % 11
  const segundoDigitoVerificador = restoSegundoDigito !== 10 ? restoSegundoDigito : 0

  const cpfValido = Number(cpf.at(9)) === primeiroDigitoVerificador &&
    Number(cpf.at(10)) === segundoDigitoVerificador

  return cpfValido
}

export function isTimeInPast(data: Date, time: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (data.getTime() > today.getTime()) return false

  const timeSplit = time.split(":")
  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const timeMinutes = Number(timeSplit[0]) * 60 + Number(timeSplit[1])
  
  return nowMinutes > timeMinutes
}