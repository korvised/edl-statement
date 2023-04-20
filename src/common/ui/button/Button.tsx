import { ComponentPropsWithoutRef, FC, ReactNode } from "react"
import clsx from "clsx"

import { buttonBaseStyles, buttonVariantStyles } from "@/styles/button.style"

type Variant = "solid" | "outline"
type Color = "primary" | "dark" | "danger" | "cyan" | "white" | "gray"

type ButtonProps = {
  variant: Variant
  color: Color
  children?: ReactNode
} & ComponentPropsWithoutRef<"button">

const Button: FC<ButtonProps> = ({
  variant,
  color,
  children,
  className,
  value,
  type = "button",
  ...props
}) => {
  className = clsx(
    "font-lao",
    buttonBaseStyles[variant],
    buttonVariantStyles[variant][color],
    className
  )

  return (
    <div>
      <button type={type} className={className} {...props}>
        {children}
        <span>{value}</span>
      </button>
    </div>
  )
}

export default Button
