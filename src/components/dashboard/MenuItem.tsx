import { IRout } from "@/types/layout.type"
import { Link } from "react-router-dom"

interface Props {
  route: IRout
}

export default function MenuItem({ route }: Props) {
  return (
    <div className="divide-y overflow-hidden rounded-lg border border-gray-300">
      <div className="flex justify-between gap-x-2 p-4 sm:flex-col-reverse sm:gap-y-2 md:flex-row">
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-700">{route.title}</h1>
          <h3 className="text-sm text-gray-600">{route.description}</h3>
        </div>

        <route.icon className="h-24 min-h-fit w-24 min-w-fit text-gray-400" />
      </div>

      <Link
        to={route.path}
        className="group block flex py-2 pl-4 text-sm text-blue-600 hover:bg-gray-100 hover:text-blue-800"
      >
        <div>{route.name || "ເພີ່ມເຕີ່ມ..."}</div>
        <div className="ml-4 transform transition-transform delay-75 duration-100 ease-in group-hover:translate-x-1">
          &rarr;
        </div>
      </Link>
    </div>
  )
}
