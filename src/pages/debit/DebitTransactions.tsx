import { Fragment, useCallback, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { HiOutlineDocumentAdd } from "react-icons/all"

import {
  AppTitle,
  Breadcrumbs,
  DateFormat,
  Empty,
  NumberFormat,
} from "@/common/ui/components"
import { TransactionFilter } from "@/components/debit"
import { Layout } from "@/common/ui/layout"
import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { ITransaction } from "@/types/debit.type"
import { Table } from "@/common/ui/table"
import { APIStatus } from "@/types/api.type"
import { AlertService, DateService } from "@/common/services"
import { Button } from "@/common/ui/button"
import { downloadDebitXML } from "@/state/slices"

const alertService = new AlertService()
const dateService = new DateService()

export default function DebitTransactions() {
  const dispatch = useAppDispatch()

  const { transaction } = useAppSelector(state => state.debit)

  const columns: ColumnDef<ITransaction, any>[] = useMemo(
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

  const data = useMemo(() => transaction.data, [transaction.data])

  const selectedDate = useMemo(
    () =>
      transaction.filteredText
        ? dateService.formatLocaleDate(transaction.filteredText)
        : "",
    [transaction.filteredText]
  )

  const handleDownload = useCallback(async () => {
    if (transaction.filter) {
      const result = await alertService.confirmModal(
        "ຫຼັງຈາກສ້າງໄຟລ໌ແລ້ວຂໍ້ມູນທຸລະກຳທີ່ຖືກສ້າງເປັນໄຟລ໌ XML ຈະຫາຍໄປ"
      )
      if (result.isConfirmed) {
        console.log("handleDownload")
        dispatch(downloadDebitXML(transaction.filter))
      }
    }
  }, [dispatch])

  return (
    <Fragment>
      <AppTitle title="List of debit" />
      <Layout>
        <Breadcrumbs name="ສ້າງໄຟລ໌ຕັດໜີ້" />
        <section className="section-md space-y-3 py-6">
          <TransactionFilter />

          {data.length > 0 && (
            <Table data={data} columns={columns}>
              <Button
                variant="solid"
                color="cyan"
                className="gap-x-1.5"
                onClick={handleDownload}
              >
                <HiOutlineDocumentAdd className="h-5 w-5" />
                <span>ສ້າງໄຟລ໌ຕັດໜີ້</span>
              </Button>
            </Table>
          )}

          {transaction.status !== APIStatus.IDLE && data.length === 0 && (
            <Empty
              text={`ຍັງບໍ່ທັນມີຂໍ້ມູນການຊໍາລະຄ່ານໍ້າປະປາໃນວັນທີ ${selectedDate}`}
              className="pt-5"
            />
          )}
        </section>
      </Layout>
    </Fragment>
  )
}
