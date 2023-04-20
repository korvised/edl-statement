import { FC, HTMLProps } from "react"
import { format, isValid } from "date-fns"

type Props = {
  date: Date | string
  dateFormat?: string
  timeFormat?: string
} & HTMLProps<HTMLSpanElement>

const DateTimeFormat: FC<Props> = ({
  date,
  dateFormat = "dd/MM/yyyy",
  timeFormat = "HH:mm:ss",
  ...props
}) => {
  return (
    <span {...props}>
      <span>
        {isValid(new Date(date)) ? format(new Date(date), dateFormat) : "--"}
      </span>{" "}
      <span className="text-orange-500">
        {isValid(new Date(date)) ? format(new Date(date), timeFormat) : ""}
      </span>
    </span>
  )
}

export default DateTimeFormat
