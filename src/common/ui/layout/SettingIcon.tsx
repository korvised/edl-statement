import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"

export default function SettingIcon() {
  return (
    <Link to="/settings">
      <Cog6ToothIcon className="h-7 w-7 transform text-gray-600 transition-transform delay-75 duration-150 ease-in-out hover:-rotate-45 hover:text-gray-700" />
    </Link>
  )
}
