import { FC } from "react"
import { HiLockClosed, HiStatusOnline } from "react-icons/hi"

interface Props {
  isLocked: boolean
}

const StatusCell: FC<Props> = ({ isLocked }) => {
  return (
    <div className='"flex items-center"'>
      {isLocked ? (
        <HiStatusOnline className="h-6 w-6 text-teal-500" />
      ) : (
        <HiLockClosed className="h-6 w-6 text-rose-600" />
      )}
    </div>
  )
}

export default StatusCell
