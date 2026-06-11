export function cpfValido(cpf: string): boolean {
  let somaPrimeiroDigito = 0, restoPrimeiroDigito = 0
  let somaSegundoDigito = 0, restoSegundoDigito = 0
  const digitos = cpf.slice(0, 9)

  for(let i: number = 0; i < digitos.length; i++) {
    somaPrimeiroDigito += Number(digitos.at(i)) * i+1
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