import { FC, HTMLProps, ReactNode } from "react"
import clsx from "clsx"

import { baseTextFiledStyle } from "@/styles/input.style"

type TextFiledProps = {
  isError?: boolean | string | false | undefined
  errorMsg?: string
  children?: ReactNode
} & HTMLProps<HTMLInputElement>
const Filed: FC<TextFiledProps> = ({
  isError,
  errorMsg,
  children,
  id,
  className,
  label,
  type = "text",
  ...props
}) => {
  className = clsx(
    baseTextFiledStyle,
    isError ? "border-red-300" : "border-gray-300",
    className
  )

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block font-lao text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative mt-1">
        <input id={id} type={type} className={className} {...props} />
        {children}
      </div>

      {isError && errorMsg && (
        <p className="ml-1 mt-1 font-lao text-sm text-red-500">{errorMsg}</p>
      )}
    </div>
  )
}

export default Filed
