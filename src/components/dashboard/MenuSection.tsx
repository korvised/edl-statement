import { IRout } from "@/types/layout.type"
import MenuItem from "@/components/dashboard/MenuItem"

interface Props {
  routes: IRout[]
}

export default function MenuSection({ routes }: Props) {
  return (
    <div className="section-md grid gap-6 sm:grid-cols-2 md:gap-8">
      {routes.map(route => (
        <MenuItem key={route.path} route={route} />
      ))}
    </div>
  )
}
