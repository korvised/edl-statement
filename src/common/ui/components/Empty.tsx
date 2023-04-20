import { FC, HTMLProps } from "react"

import { CircleStackIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

type Props = {
  text?: string
} & HTMLProps<HTMLDivElement>

const Empty: FC<Props> = ({ text, className, ...props }) => {
  return (
    <div
      className={clsx(
        className,
        "mt-5 flex flex-1 flex-col items-center justify-center px-4 md:mt-10"
      )}
      {...props}
    >
      <p
        className="border-primary bg-secondary text-secondary flex h-16 w-16 items-center justify-center rounded-full
        border border-dashed border-gray-400 p-12"
      >
        <CircleStackIcon className="absolute w-8 text-gray-400" />
      </p>
      <h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
        ບໍ່ມີຂໍ້ມູນ
      </h2>
      <p className="text-accents-3 px-10 pt-2 pb-6 text-center">{text}</p>
    </div>
  )
}

export default Empty
