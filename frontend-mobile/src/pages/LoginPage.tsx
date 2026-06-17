import InputGroup from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isValidCpf, clearSession } from "@/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserService } from "@/api/userService";
import { toast } from 'sonner';

interface LoginPageFormData {
  cpf: string
  password: string
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginPageFormData>({
    cpf: "",
    password: ""
  })
  const [errors, setErrors] = useState<LoginPageFormData>({
    cpf: "",
    password: ""
  })

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    clearSession()
  }, [])

  const onSubmit = async () => {
    const { valid, formErrors } = validateFormSubmission(formData)
    if(!valid) {
      return setErrors(formErrors)
    }

    setIsLoading(true)
    try {
      const res = await UserService.login(formData.cpf, formData.password)
      if (res.sucesso) {
        localStorage.setItem('role', res.isAdmin ? 'admin' : 'user')
        localStorage.setItem('cpf', formData.cpf)
        navigate(res.isAdmin ? "/admin" : "/home")
      } else {
        toast.error(res.mensagem || "Erro ao fazer login")
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const validateFormSubmission = (form: LoginPageFormData) => {
    const newErrors = {cpf: "", password: ""}

    if(!isValidCpf(form.cpf)) {
      newErrors.cpf = "CPF inválido"
    }

    const passwordValidationRegex = /^(?=.*[a-zA-Z])(?=.*\d)[^\s]{7,}$/
    const passwordValid = form.password.length >= 7 && passwordValidationRegex.test(form.password)
    if(!passwordValid) {
      newErrors.password = "Senha inválida. A senha deve ter pelo menos 7 caracteres e deve ser composta de números e letras"
    }

    const valid = newErrors.cpf === "" && newErrors.password === ""
    return {
      valid,
      formErrors: newErrors
    }
  }

  const formSubmittable = !!formData.cpf && !!formData.password

  return (
    <div className="min-h-svh flex items-center justify-center px-4">
      <Card className="px-4 w-full shadow-2xl">
        <h2 className="text-center">Login</h2>

        <InputGroup
          id="cpf"
          label="CPF (apenas números)"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={11}
          placeholder="Insira seu CPF"
          error={errors.cpf}
          onInput={() => 
            setErrors({ ...errors, cpf: "" })
          }
          onChange={(event) => setFormData({ ...formData, cpf: event.target.value })}
        />

        <InputGroup
          id="password"
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          error={errors.password}
          onInput={() => 
            setErrors({ ...errors, password: "" })
          }
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <Button size="lg" className={"mx-auto w-full max-w-[200px]"} onClick={onSubmit} disabled={!formSubmittable || isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </Card>
    </div>
  )
}