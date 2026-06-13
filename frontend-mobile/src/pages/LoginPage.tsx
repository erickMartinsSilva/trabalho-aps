import InputGroup from "@/components/InputLabel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cpfValido } from "@/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

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

  const onSubmit = () => {
    const { valid, formErrors } = validateFormSubmission(formData)
    if(!valid) {
      return setErrors(formErrors)
    }

    navigate("/home")
  }

  const validateFormSubmission = (form: LoginPageFormData) => {
    const newErrors = {cpf: "", password: ""}

    if(!cpfValido(form.cpf)) {
      newErrors.cpf = "CPF inválido"
    }

    const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,15}$/
    const passwordValid = form.password.length >= 8 && passwordValidationRegex.test(form.password)
    if(!passwordValid) {
      newErrors.password = "Senha inválida. A senha deve ter pelo menos 8 caracteres e deve ser composta de números e letras maiúsculas e minúsculas"
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

        <Button size="lg" className={"mx-auto"} onClick={onSubmit} disabled={!formSubmittable}>
          Entrar
        </Button>
      </Card>
    </div>
  )
}