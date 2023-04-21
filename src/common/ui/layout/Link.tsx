import { NavLink } from "react-router-dom"
import clsx from "clsx"

interface Props {
  path: string
  text: string
}

export default function Link({ path, text }: Props) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          isActive ? "text-black" : "text-gray-600 hover:text-gray-900",
          "text-base font-medium"
        )
      }
    >
      {text}
    </NavLink>
  )
}
