import { FC, Fragment, ReactNode } from "react"
import { Tooltip as ReactTooltip, ITooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"

type Props = {
  id: string
  content: string
  disable?: boolean
  children: ReactNode
} & ITooltip

const Tooltip: FC<Props> = ({
  id,
  content,
  disable,
  delayShow = 350,
  delayHide = 200,
  place = "top",
  children,
  ...props
}) => {
  return (
    <Fragment>
      {!disable && (
        <ReactTooltip
          anchorId={id}
          delayShow={delayShow}
          delayHide={delayHide}
          place={place}
          content={content}
          {...props}
        />
      )}

      <div id={id}>{children}</div>
    </Fragment>
  )
}

export default Tooltip
