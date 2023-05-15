import { Fragment, useCallback, useEffect, useMemo } from "react"

import { Layout } from "@/common/ui/layout"
import {
  AppTitle,
  Breadcrumbs,
  DateTimeFormat,
  Empty,
} from "@/common/ui/components"
import { getDebitHistories } from "@/state/slices"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { Table } from "@/common/ui/table"
import { APIStatus } from "@/types/api.type"
import { ColumnDef } from "@tanstack/react-table"
import { DownloadFileCell } from "@/components/debit"
import { IDebitHistory } from "@/types/debit.type"
import { Button } from "@/common/ui/button"
import { HiRefresh } from "react-icons/all"

export default function DebitHistories() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDebitHistories())
  }, [dispatch])

  const { histories } = useAppSelector(state => state.debit)
  const { data: historiesData = [], status } = histories

  const columns = useMemo<ColumnDef<IDebitHistory, any>[]>(
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

  const data = useMemo(() => historiesData, [historiesData])

  const onRefresh = useCallback(() => {
    dispatch(getDebitHistories())
  }, [dispatch])

  return (
    <Fragment>
      <AppTitle title="list of download's histories" />
      <Layout>
        <Breadcrumbs name="ປະຫວັດການສ້າງໄຟລ໌ຕັດໜີ້" />
        <section className="section-md">
          {status !== APIStatus.IDLE && data.length === 0 && (
            <Empty text="ຍັງບໍ່ທັນມີປະຫວັດການອັບໂຫຼດຂໍ້ມູນເຂົ້າລະບົບຂອງ ທສກ" />
          )}
          {data.length > 0 && (
            <Table data={data} columns={columns}>
              <Button variant="outline" color="dark" onClick={onRefresh}>
                <HiRefresh className="h-5 w-5" />
              </Button>
            </Table>
          )}
        </section>
      </Layout>
    </Fragment>
  )
}
