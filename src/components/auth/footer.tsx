import { APP_VERSION } from "@/config/const"

export function Footer() {
  return (
    <div className="section-md absolute bottom-0 left-0 w-full">
      <footer
        aria-labelledby="footer-heading"
        className="mx-auto flex h-12 h-16 max-w-7xl flex-col items-center justify-between px-4 py-2 sm:flex-row sm:px-8 sm:py-0"
      >
        <p className="text-base text-gray-200">
          &copy; {new Date().getFullYear()} ສະຫງວນລິຂະສິດໂດຍ
          ທະນາຄານສົ່ງເສີມກະສິກຳ ຈຳກັດ.
        </p>

        <p className="text-base text-gray-200">Version {APP_VERSION}</p>
      </footer>
    </div>
  )
}
