import clsx from "clsx"
import { HTMLProps, useMemo } from "react"

type LogoProps = HTMLProps<HTMLDivElement>

const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
  className = useMemo(() => clsx(className), [className])

  return (
    <div className={className} {...props}>
      <b className="text-xs font-semibold text-zinc-800 sm:text-sm">
        ທະນາຄານສົ່ງເສີມກະສີກໍາ
      </b>
      <p
        className="
         font-mono
         text-base
         text-xs 
         overline
         decoration-amber-400
         decoration-2
         underline-offset-4
         sm:text-sm
        "
      >
        APIS Water Supply
      </p>
    </div>
  )
}

export default Logo
