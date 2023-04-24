interface IButtonBaseStyle {
  solid: string
  outline: string
}

interface IButtonColorStyle {
  primary: string
  danger: string
  dark?: string
  cyan?: string
  white?: string
  gray?: string
}

interface IButtonVariantStyle {
  solid: IButtonColorStyle
  outline: IButtonColorStyle
}

export const buttonBaseStyles: IButtonBaseStyle = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors transition delay-150 ease-in-out",
  outline:
    "inline-flex justify-center rounded-lg border py-2 px-3 text-sm outline-2 outline-offset-2 transition-colors",
}

export const buttonVariantStyles: IButtonVariantStyle = {
  solid: {
    primary:
      "relative overflow-hidden bg-teal-600 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-teal-600 active:text-white/80 before:transition-colors",
    dark: "relative overflow-hidden bg-black text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-gray-800 active:text-white/80 before:transition-colors",
    danger:
      "relative overflow-hidden bg-rose-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-rose-600 active:text-white/80 before:transition-colors",
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
  },
  outline: {
    primary:
      "border-teal-300 text-teal-700 hover:border-teal-400 active:bg-teal-100 active:text-teal-700/80",
    dark: "border-gray-800 text-gray-700 hover:border-black hover:bg-black hover:text-white active:bg-gray-200 active:text-gray-900",
    danger:
      "border-rose-300 text-rose-700 hover:border-rose-400 active:bg-rose-100 active:text-rose-700/80",
    cyan: "border-teal-300 text-teal-700 hover:border-teal-400 active:bg-teal-100 active:text-teal-700/80 hover:bg-teal-500 hover:text-white",
    white:
      "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-zinc-100 active:bg-gray-100 active:text-gray-700/80 bg-white",
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
  },
}
