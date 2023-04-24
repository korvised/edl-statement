import { Fragment, useEffect, useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { PlusSmallIcon } from "@heroicons/react/24/solid"

import { useAppDispatch, useAppSelector } from "@/state/hooks"
import { IUser } from "@/types/user.type"
import { APIStatus } from "@/types/api.type"
import {
  AppTitle,
  Breadcrumbs,
  DateTimeFormat,
  Empty,
} from "@/common/ui/components"
import { Layout } from "@/common/ui/layout"
import { getUsers } from "@/state/slices/userSlice"
import { fuzzyFilter, Table } from "@/common/ui/table"
import { ButtonGroup, StatusCell, StatusFilter } from "@/components/user"
import { Button } from "@/common/ui/button"
import { useGetProvincesQuery } from "@/state/queries/provinceApiSlice"

export default function Users() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const { data: provinces = [] } = useGetProvincesQuery()

  const user = useAppSelector(state => state.user)

  const columns = useMemo<ColumnDef<IUser, any>[]>(
    () => [
      {
        cell: ({ row }) => row.index + 1,
        header: "ລ/ດ",
      },
      {
        accessorKey: "fullName",
        cell: info => info.getValue(),
        header: "ຊື່ ແລະ ນາມສະກຸນ",
      },
      {
        accessorKey: "tel",
        cell: info => info.getValue(),
        header: "ເບີຕິດຕໍ່",
      },
      {
        accessorKey: "username",
        cell: info => info.getValue(),
        header: "Username",
      },
      {
        accessorKey: "provinceName",
        cell: info => info.getValue(),
        header: "ແຂວງ",
        filterFn: fuzzyFilter,
        meta: {
          isOptionFilter: true,
          minWidth: "min-w-[10rem]",
        },
      },
      {
        accessorKey: "accountLocked",
        cell: info => <StatusCell isLocked={info.getValue()} />,
        filterFn: fuzzyFilter,
        meta: {
          filterComponent: StatusFilter,
          isCustomFilterComponent: true,
        },
        header: "ສະຖານະ",
      },
      {
        accessorKey: "createdDate",
        cell: info => <DateTimeFormat date={info.getValue()} />,
        header: "ວັນທີ່",
      },
      {
        accessorKey: "userId",
        cell: info => (
          <ButtonGroup row={info.row.original} provinces={provinces} />
        ),
        enableSorting: false,
        header: "",
      },
    ],
    []
  )

  const data = useMemo(() => user.data, [user.data])

  return (
    <Fragment>
      <AppTitle title="Users | ຈັດການຂໍ້ມູນຜູ້ໃຂ້" />
      <Layout>
        <Breadcrumbs name="ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານ" />
        <section className="section-md pb-6 pt-2">
          <div className="flex justify-end">
            <Button
              variant="solid"
              color="primary"
              value="ລົງທະບຽນໃໝ່"
              className="gap-x-1"
            >
              <PlusSmallIcon className="h-5 w-5" />
            </Button>
          </div>
          {data.length > 0 && <Table data={data} columns={columns} />}

          {user.status !== APIStatus.IDLE && data.length === 0 && (
            <Empty text="ຍັງບໍ່ທັນມີຂໍ້ມູນຜູ້ໃຊ້ງານ" className="pt-5" />
          )}
        </section>
      </Layout>
    </Fragment>
  )
}
