import { Link } from "react-router-dom"
import { Button } from "@/common/ui/button"

export default function NotFound() {
  return (
    <div className="relative">
      <div className="min-h-screen bg-auth bg-cover bg-top blur-sm brightness-50 sm:bg-top" />
      <div className="absolute top-0 left-0 h-screen w-screen">
        <div className="mx-auto max-w-7xl py-16 px-6 text-center sm:py-24 lg:px-8 lg:py-48">
          <p className="text-base font-semibold text-amber-400">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Uh oh! I think you’re lost.
          </h1>
          <p className="mt-2 text-lg font-medium text-zinc-300">
            It looks like the page you’re looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button variant="outline" color="white" value="Go back home" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
