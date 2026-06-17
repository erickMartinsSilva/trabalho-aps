export function isValidCpf(cpf: string): boolean {
  const onlyNumbersRegex = /^\d+$/
  const isCpfLengthAndFormatValid = cpf.length === 11 && onlyNumbersRegex.test(cpf)
  if(!isCpfLengthAndFormatValid) return false

  let sumFirstDigit = 0
  let sumSecondDigit = 0
  const digits = cpf.slice(0, 9)

  for(let i: number = 0; i < digits.length; i++) {
    sumFirstDigit += Number(digits.at(i)) * (i+1)
    sumSecondDigit += Number(digits.at(i)) * i
  }

  const remainderFirstDigit = sumFirstDigit % 11
  const firstVerifierDigit = remainderFirstDigit !== 10 ? remainderFirstDigit : 0
  
  sumSecondDigit += firstVerifierDigit * 9
  const remainderSecondDigit = sumSecondDigit % 11
  const secondVerifierDigit = remainderSecondDigit !== 10 ? remainderSecondDigit : 0

  const isCpfValid = Number(cpf.at(9)) === firstVerifierDigit &&
    Number(cpf.at(10)) === secondVerifierDigit

  return isCpfValid
}

export function isTimeInPast(date: Date, time: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date.getTime() > today.getTime()) return false

  const timeSplit = time.split(":")
  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const timeMinutes = Number(timeSplit[0]) * 60 + Number(timeSplit[1])
  
  return nowMinutes > timeMinutes
}