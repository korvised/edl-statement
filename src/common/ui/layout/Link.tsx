import { NavLink } from "react-router-dom"
import clsx from "clsx"

interface Props {
  path: string
  label: string
}

export default function Link({ path, label }: Props) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          isActive ? "text-black" : "text-gray-500 hover:text-gray-900",
          "sm:text-sm font-medium"
        )
      }
    >
      {label}
    </NavLink>
  )
}
