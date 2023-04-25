import { Fragment, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import clsx from "clsx"

import { ICustomer } from "@/types/upload.type"
import { useGetUploadDataQuery } from "@/state/queries/uploadApiSlice"
import {
  AppTitle,
  Breadcrumbs, Empty,
  Loading,
  NumberFormat
} from "@/common/ui/components"
import { Table } from "@/common/ui/table"
import { Layout } from "@/common/ui/layout"

export default function Customers() {
  const { data: customers = [], isLoading } = useGetUploadDataQuery()

  const columns = useMemo<ColumnDef<ICustomer, any>[]>(
    () => [
      {
        cell: ({ row }) => row.index + 1,
        header: "ລ/ດ",
      },
      {
        accessorKey: "numcli",
        cell: info => info.getValue(),
        header: "ເລກທີ່ຊົມໃຊ້",
      },
      {
        accessorKey: "nomsoc",
        cell: info => info.getValue(),
        header: "ຊື່ຜູ້ຊົມໃຊ້",
      },
      {
        accessorKey: "debt",
        cell: info => (
          <NumberFormat
            value={info.getValue()}
            className={clsx(
              info.getValue() > 0 && "text-red-500",
              info.getValue() < 0 && "text-green-500"
            )}
          />
        ),
        header: "ຍອດໜີ້ ( ກີບ )",
      },
      {
        accessorKey: "billdate",
        cell: info => info.getValue(),
        header: "ວັນທີ່",
      },
    ],
    []
  )

  const data = useMemo(() => customers, [customers])

  return (
    <Fragment>
      {isLoading && data.length === 0 && <Loading />}
      <AppTitle title="Water supply's customers" />
      <Layout>
        <Breadcrumbs name="ຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາ" />
        <section className="section-md py-6">
          {!isLoading && data.length === 0 && (
            <Empty text="ຍັງບໍ່ມີຂໍ້ມູນຜູ້ຊົມໃຊ້ນໍ້າປະປາໃນແຂວງຂອງທ່ານຢູ່ໃນລະບົບຂອງ ທສກ" />
          )}
          {data.length > 0 && <Table data={data} columns={columns} />}
        </section>
      </Layout>
    </Fragment>
  )
}
