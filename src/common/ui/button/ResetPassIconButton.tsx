import { ComponentPropsWithoutRef, FC } from "react"
import { MdOutlineVpnKey } from "react-icons/md"
import clsx from "clsx"
import { Tooltip } from "@/common/ui/components"

type Props = { id: string } & ComponentPropsWithoutRef<"button">

const ResetPassIconButton: FC<Props> = ({
  id,
  disabled,
  type = "button",
  className,
  ...props
}) => {
  className = clsx(
    "transition-all duration-150 ease-in-out ring-2 ring-white w-8 h-8 flex items-center justify-center rounded-full shadow",
    disabled
      ? "text-black/40 cursor-default"
      : "text-red-500 hover:bg-red-600 hover:text-white focus:ring-red-600",
    className
  )

  return (
    <Tooltip
      id={id}
      content="ປ່ຽນລະຫັດຜ່ານ"
      disable={disabled}
      delayShow={700}
      delayHide={0}
    >
      <button type={type} className={className} {...props}>
        <MdOutlineVpnKey className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}

export default ResetPassIconButton
