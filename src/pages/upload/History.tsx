import { Fragment, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { ColumnDef } from "@tanstack/react-table"

import { IUploadHistory } from "@/types/upload.type"
import { AppTitle, Breadcrumbs, DateTimeFormat } from "@/common/ui/components"
import { Table } from "@/common/ui/table"
import { Layout } from "@/common/ui/layout"
import { DownloadFileCell } from "@/components/upload"
import { getUploadHistories } from "@/state/slices/uploadSlice"

export default function History() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUploadHistories())
  }, [dispatch])

  const { histories } = useAppSelector(state => state.upload)

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

  const data = useMemo(() => histories.data, [histories])

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

