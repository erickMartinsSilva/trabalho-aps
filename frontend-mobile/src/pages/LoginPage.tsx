import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cpfValido } from "@/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

interface LoginPageFormData {
  cpf: string
  password: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginPageFormData>({
    cpf: undefined,
    password: undefined
  })
  const [errors, setErrors] = useState<{cpf?: string, password?: string}>({
    cpf: undefined,
    password: undefined
  })

  const navigate = useNavigate()

  const formSubmittable = !!formData.cpf && !!formData.password

  const onSubmit = () => {
    let newErrors: typeof errors = {}
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{8,15}/

    const { cpf, password } = formData
    if(!cpf || !password) {
      newErrors.general = "Um ou mais campos obrigatórios estão vazios"
      return setErrors(newErrors)
    }
    if(!cpfValido(cpf)) {
      newErrors.cpf = "CPF inválido"
    }
    const passwordValid = password.length <= 8 && regex.test(password)
    if(!passwordValid) {
      newErrors.password = "Senha inválida. Senha deve ter pelo menos 8 caracteres e deve ser composta de números e letras maiúsculas e minúsculas"
    }

    if(Object.values(newErrors).length) {
      return setErrors(newErrors)
    }
    navigate("/")
  }

  return (
    <div className="min-h-svh flex items-center justify-center px-4">
      <Card className="px-4 w-full shadow-2xl">
        <h2 className="text-center">Login</h2>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cpf">CPF (apenas números)</Label>
          <Input
            id="cpf"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            placeholder="Insira seu CPF"
            className={errors.cpf ? "border-red-500 text-red-500" : undefined}
            onInput={(e) => {
              setErrors({...errors, cpf: undefined})
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')
            }}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
          {errors.cpf && <p className="text-xs font-semibold text-red-500">{errors.cpf}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="Insira sua senha"
            className={errors.password ? "border-red-500 text-red-500" : undefined}
            onInput={() =>
              setErrors({...errors, password: undefined})
            }
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <p className="text-xs font-semibold text-red-500">{errors.password}</p>}
        </div>

        <Button className={"mx-auto"} onClick={onSubmit} disabled={!formSubmittable}>
          Entrar
        </Button>
      </Card>
    </div>
  )
}