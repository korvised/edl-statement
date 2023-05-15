import { Fragment, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"

import { useAppSelector } from "@/state/hooks"
import { APIStatus } from "@/types/api.type"
import { IStatement } from "@/types/statement.type"
import { Layout } from "@/common/ui/layout"
import {
  AppTitle,
  Breadcrumbs,
  DateFormat,
  Empty,
  NumberFormat,
} from "@/common/ui/components"
import { Table } from "@/common/ui/table"
import { StatementFilter } from "@/components/statement"

export default function Statement() {
  const statement = useAppSelector(state => state.statement)

  const columns = useMemo<ColumnDef<IStatement, any>[]>(
    () => [
      {
        cell: ({ row }) => row.index + 1,
        header: "ລ/ດ",
      },
      {
        accessorKey: "transId",
        cell: info => info.getValue(),
        header: "ລະຫັດທຸລະກຳ",
      },
      {
        accessorKey: "billNumber",
        cell: info => info.getValue(),
        header: "ເລກທີ່ຊົມໃຊ້",
      },
      {
        accessorKey: "billName",
        cell: info => info.getValue(),
        header: "ຊື່ຜູ້ຊົມໃຊ້",
      },
      {
        accessorKey: "fromAcctNumber",
        cell: info => info.getValue(),
        header: "ໂອນຈາກບັນຊີ",
      },
      {
        accessorKey: "amount",
        cell: info => <NumberFormat value={info.getValue()} />,
        header: "ຈໍານວນ ( ກີບ )",
      },
      {
        accessorKey: "createAt",
        cell: info => <DateFormat date={info.getValue()} />,
        header: "ວັນທີ່",
      },
    ],
    []
  )

  const data = useMemo(() => statement.data, [statement.data])

  return (
    <Fragment>
      <Layout>
        <AppTitle title="Statement" />
        <Breadcrumbs name="Statement" />
        <section className="section-md space-y-3 py-6">
          <StatementFilter />

          {data.length > 0 && <Table data={data} columns={columns} />}

          {statement.status !== APIStatus.IDLE && data.length === 0 && (
            <Empty
              text={`ຍັງບໍ່ທັນມີຂໍ້ມູນການຊໍາລະຄ່ານໍ້າປະປາ${statement.dateText}`}
              className="pt-5"
            />
          )}
        </section>
      </Layout>
    </Fragment>
  )
}
