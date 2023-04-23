import { FC, HTMLProps } from "react"

type Props = { value: number | string } & HTMLProps<HTMLDivElement>

const NumberFormat: FC<Props> = ({ value, ...props }) => {
  return (
    <div {...props}>
      {parseInt(value as string).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </div>
  )
}

export default NumberFormat
