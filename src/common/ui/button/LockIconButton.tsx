import { ComponentPropsWithoutRef, FC } from "react"
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

import { Tooltip } from "@/common/ui/components"

type Props = {
  id: string
  status: boolean
} & ComponentPropsWithoutRef<"button">

const EditIconButton: FC<Props> = ({
  id,
  status,
  type = "button",
  className,
  ...props
}) => {
  className = clsx(
    "transition-all duration-150 ease-in-out ring-2 ring-white w-8 h-8 flex items-center justify-center rounded-full shadow",
    status
      ? "text-red-500 hover:bg-red-600 hover:text-white focus:ring-red-600"
      : "text-blue-500 hover:bg-blue-600 hover:text-white focus:ring-blue-600",
    className
  )

  return (
    <Tooltip
      id={id}
      content={status ? "ລ໋ອກຜູ້ໃຊ້" : "ປົດລ໋ອກຜູ້ໃຊ້"}
      delayShow={700}
      delayHide={0}
    >
      <button type={type} className={className} {...props}>
        {status ? (
          <LockClosedIcon className="h-5 w-5" />
        ) : (
          <LockOpenIcon className="h-5 w-5" />
        )}
      </button>
    </Tooltip>
  )
}

export default EditIconButton
