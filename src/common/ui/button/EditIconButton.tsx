import { ComponentPropsWithoutRef, FC } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { Tooltip } from "@/common/ui/components"

type Props = { id: string } & ComponentPropsWithoutRef<"button">

const EditIconButton: FC<Props> = ({
  id,
  type = "button",
  className,
  ...props
}) => {
  className = clsx(
    "transition-all duration-150 ease-in-out ring-2 ring-white w-8 h-8 flex items-center justify-center rounded-full shadow",
    "text-black/70 hover:bg-teal-500 hover:text-white focus:ring-teal-400",
    className
  )

  return (
    <Tooltip id={id} content="ແກ້ໄຂ" delayShow={700} delayHide={0}>
      <button type={type} className={className} {...props}>
        <PencilSquareIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}

export default EditIconButton
