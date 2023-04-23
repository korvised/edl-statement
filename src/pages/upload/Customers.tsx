import { Fragment, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { ColumnDef } from "@tanstack/react-table"

import { ICustomer } from "@/types/upload.type"
import { AppTitle, Breadcrumbs, NumberFormat } from "@/common/ui/components"
import { Table } from "@/common/ui/table"
import { Layout } from "@/common/ui/layout"
import { getCustomersData } from "@/state/slices/uploadSlice"
import clsx from "clsx"

export default function Customers() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCustomersData())
  }, [dispatch])

  const { customers } = useAppSelector(state => state.upload)

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

  const data = useMemo(() => customers.data, [customers])

  return (
    <Fragment>
      <AppTitle title="Upload History" />
      <Layout>
        <Breadcrumbs name="ປະຫວັດການອັບໂຫຼດໄຟລ໌" />
        <section className="section-md py-6">
          {data && <Table data={data} columns={columns} />}
        </section>
      </Layout>
    </Fragment>
  )
}
