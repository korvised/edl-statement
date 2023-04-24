import { Fragment } from "react"

import { Layout } from "@/common/ui/layout"
import { AppTitle, Breadcrumbs } from "@/common/ui/components"

const people = [
  {
    name: "ປະຫວັດຄວາມເປັນມາ",
    role: "ຄວາມເປັນມາຂອງທະນາຄາສົ່ງເສີມກະສະກໍາ ຈໍາກັດ",
    imageUrl: "https://www.apb.com.la/images/35.jpg",
    bio: "ທະນາຄານ​ສົ່ງເສີມ​ກະສິກຳ ​ສ້າງ​ຕັ້ງຂຶ້ນ​ຕາມດຳ​ລັດ​ຂອງ​ນາຍົກ​ລັດຖະ​ມົນຕີ ​ເລກ​ທີ ​92/ນ​ຍ ​ລົງ​ວັນ​ທີ ​19 ​ມິຖຸນາ ​1993, ​ໃຊ້​ຕົວ​ອັກ​ສອນ​ຫຍໍ້ ​“ທສກ” ​ເປັນ​ທະນາຄານ​ພັດທະນາ​ຕາມ​ຂະແໜງການ ​ເປັນ​ອົງການ​ນິຕິ​ບຸກຄົນ ​ໂດຍ​ມີຈຸດ​ປະສົງ​ເພື່ອ​ສະໜອງ​ສິນ​ເຊື່ອ ​ເຂົ້າໃນການ​ພັດທະນາ​ຂະແໜງ​ການ​ກະສິກຳ-ປ່າໄມ້ ​ເປັນ​ຕົ້ນຕໍ, ​ດຳເນີນ​ທຸລະກິດ​ໂດຍ​ບໍ່​ສະ​ແຫວງ​ຫາ​ຜົນ​ກຳໄລ, ​ສະໜອງ​ສິນເຊື່ອ​ດ້ວຍ​ອັດຕາ​ດອກ​ເບ້ຍຕໍ່າ​ໃຫ້​ຊາວ​ກະສິກອນ​ທັງເປັນລາຍກຸ່ມ ​ແລະ ​ລາຍ​ບຸກຄົນ ​ດ້ວຍ​ແຫຼ່ງ​ທຶນ​ຂອງ​ລັດຖະບານ ​ແລະ ​ອົງການ​ຕ່າງໆ​ສະໜອງ​ໃຫ້, ​ທສກ ​ໃນ​ເວລາ​ນັ້ນ​ບໍ່ໄດ້ເຮັດ​ໜ້າທີ່ລະ ​ດົມ​ເງິນ​ຝາກ, ​ດ​ຳເນີນ​ງານພາຍ​ໃຕ້ລະບຽບ​ຄຸ້ມຄອງ​ທີ່ແຕກ​ຕ່າງ​ຈາກ​ສະຖາ​ບັນ​ການ​ເງິນ​ອື່ນ. ​ມີທຶນ​ຈົດ​ທະ​ບຽນ​ເບື້ອງ​ຕົ້ນ​ທັງ​ໝົດ 1​,​000​,000​,000​ ​ກີບ ​(ໜຶ່ງຕື້ກີບ) ​ແບ່ງເປັນ ​1,000,000 ​ຮຸ້ນ, ​ຮຸ້ນລະ ​1,000 ​ກີບ.",
  },
  // More people...
]

export default function About() {
  return (
    <Fragment>
      <AppTitle title="About us" />
      <Layout>
        <Breadcrumbs name="ກ່ຽວກັບພວກເຮົາ" />
        <section className="section-md py-6">
          <div className="mt-4 space-y-8">
            <ul role="list" className="space-y-12">
              {people.map(person => (
                <li key={person.name}>
                  <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                    <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4 min-h-fit">
                      <img
                        className="rounded-lg object-cover shadow-lg"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="space-y-4">
                        <div className="space-y-1 text-lg font-medium leading-6">
                          <h3 className="text-3xl font-extrabold">
                            {person.name}
                          </h3>
                          <p className="text-teal-600">{person.role}</p>
                        </div>
                        <div className="text-base">
                          <p className="text-gray-500">{person.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Layout>
    </Fragment>
  )
}
