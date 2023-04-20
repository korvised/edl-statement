import { FC } from "react"

interface LoadingProps {
  msg?: string
}

const Loading: FC<LoadingProps> = ({ msg = "Loading..." }) => (
  <div className="fixed inset-0 z-[100] overflow-y-auto">
    <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 bg-black/50 transition-opacity">
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="relative inline-block w-fit align-middle">
          <div className="relative inline-block w-fit rounded-full shadow transition-all">
            <div className="absolute left-1.5 top-1.5 backdrop-opacity-90">
              <div className="relative backdrop-opacity-20">
                <img
                  src="/apb-logo-300x300.png"
                  alt="gogo"
                  className="h-11 w-11 rounded-full"
                />
              </div>
            </div>
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-teal-600 ease-linear" />
          </div>

          <h3 className="mt-1 text-center font-lao text-base font-medium text-white lg:mt-2">
            {msg}
          </h3>
        </div>
      </div>
    </div>
  </div>
)

export default Loading
