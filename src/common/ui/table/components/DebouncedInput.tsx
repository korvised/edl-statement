import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react"
import { TextFiled } from "@/common/ui/field"

type Props = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">

const DebouncedInput: FC<Props> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return <TextFiled {...props} value={value} onChange={handleChange} />
}

export default DebouncedInput
