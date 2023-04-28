import { APP_VERSION } from "@/config/const"

export function Footer() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <footer
        aria-labelledby="footer-heading"
        className="section-md flex h-12 flex-col items-center justify-between px-4 py-2 sm:flex-row sm:px-6 sm:px-8 sm:py-0 sm:text-sm lg:px-8"
      >
        <p className="text-gray-200">
          &copy; {new Date().getFullYear()} ສະຫງວນລິຂະສິດໂດຍ
          ທະນາຄານສົ່ງເສີມກະສິກຳ ຈຳກັດ.
        </p>

        <p className="text-gray-200">Version {APP_VERSION}</p>
      </footer>
    </div>
  )
}
