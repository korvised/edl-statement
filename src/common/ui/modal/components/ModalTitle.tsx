import { FC } from "react"

interface Props {
  title: string
}

const ModalTitle: FC<Props> = ({ title }) => {
  return (
    <div className="relative h-8 w-full">
      <div className="absolute -top-6 flex w-full items-center justify-center">
        <h2 className="rounded-b-md bg-teal-600 px-2.5 py-1.5 text-center font-lao text-xl text-white">
          {title}
        </h2>
      </div>
    </div>
  )
}

export default ModalTitle
