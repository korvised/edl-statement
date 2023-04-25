import { Fragment, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { IUploadHistory } from "@/types/upload.type"
import { useGetUploadHistoriesQuery } from "@/state/queries/uploadApiSlice"
import {
  AppTitle,
  Breadcrumbs,
  DateTimeFormat,
  Loading,
} from "@/common/ui/components"
import { Table } from "@/common/ui/table"
import { Layout } from "@/common/ui/layout"
import { DownloadFileCell } from "@/components/upload"

export default function History() {
  const { data: histories = [], isLoading } = useGetUploadHistoriesQuery()

  const columns = useMemo<ColumnDef<IUploadHistory, any>[]>(
    () => [
      {
        cell: ({ row }) => row.index + 1,
        header: "ລ/ດ",
      },
      {
        accessorKey: "fileName",
        cell: info => info.getValue(),
        header: "ຊື່ໄຟລ໌",
      },
      {
        accessorKey: "username",
        cell: info => info.getValue(),
        header: "ຜູ້ອັບໂຫຼດ",
      },
      {
        accessorKey: "createdDate",
        cell: info => <DateTimeFormat date={info.getValue()} />,
        header: "ວັນທີ",
      },
      {
        cell: ({ row }) => (
          <DownloadFileCell fileName={row.original.fileName} />
        ),
        header: "ດາວໂຫຼດ",
      },
    ],
    []
  )

  const data = useMemo(() => histories, [histories])

  return (
    <Fragment>
      {isLoading && data.length === 0 && <Loading />}
      <AppTitle title="Upload History" />
      <Layout>
        <Breadcrumbs name="ປະຫວັດການອັບໂຫຼດໄຟລ໌" />
        <section className="section-md py-6">
          {data.length > 0 && <Table data={data} columns={columns} />}
        </section>
      </Layout>
    </Fragment>
  )
}
