import { FC, HTMLProps } from "react"

type Props = { value: number | string } & HTMLProps<HTMLSpanElement>

const NumberFormat: FC<Props> = ({ value, ...props }) => {
  return (
    <span {...props}>
      {parseInt(value as string).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </span>
  )
}

export default NumberFormat
