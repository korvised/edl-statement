
export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="mx-auto flex h-12 max-w-7xl flex-col items-center justify-between py-2 px-4 sm:flex-row sm:px-8 sm:py-0"
    >
      <p className="text-base text-gray-400">
        &copy; {new Date().getFullYear()} ສະຫງວນລິຂະສິດໂດຍ ທະນາຄານສົ່ງເສີມກະສິກຳ
        ຈຳກັດ.
      </p>

      <p className="text-base text-gray-400">Version {import.meta.env.VITE_APP_VERSION}</p>
    </footer>
  )
}
