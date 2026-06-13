import type React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface InputLabelProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
}

export default function InputLabel({ id, className, type, error, ...props }: InputLabelProps) {
  const inputClassName = error ? "border-red-500 text-red-500" : className
  
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{props.label}</Label>
      <Input
        id={id}
        type={type}
        className={inputClassName}
        {...props}
      />
      {error && <p className="text-xs font-bold text-red-500">{error}</p>}
    </div>
  )
}