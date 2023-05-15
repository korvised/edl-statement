export const baseTextFiledStyle =
  "block w-full appearance-none rounded-lg border bg-white py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-400 focus:outline-none focus:ring-white sm:text-sm font-lao"

export const datepickerStyle = {
  base: "relative inline-flex items-center justify-between rounded-md border bg-white py-2 pl-3 pr-2 text-base",
  status: {
    enabled:
      "hover:text-opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 text-gray-600",
    disabled: "bg-zinc-100 text-gray-500",
    invalid: "border-red-300 focus:border-gray-200",
  },
  arrowIcon: {
    base: "ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-opacity-80",
    down: "text-gray-400",
    up: "text-zinc-800",
  },
}
