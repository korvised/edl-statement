import { FC, ReactNode, useMemo, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid"
import { rankItem } from "@tanstack/match-sorter-utils"
import clsx from "clsx"

import { CustomFilterMeta } from "@/types/table.type"
import { pagination as getPages } from "@/common/utils"
import { ColumnFilter, PageOption } from "./components/Filter"
import { DebouncedInput } from "./components"

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export interface TableProps {
  data: any[]
  columns: ColumnDef<any, any>[]
  children?: ReactNode
}

const Table: FC<TableProps> = ({ data, columns, children }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    autoResetAll: false, //* disable auto refresh table when data update
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  })

  const { pagination } = table.getState()

  const pages = useMemo(
    () => getPages(data.length, pagination.pageIndex, pagination.pageSize, 6),
    [data.length, pagination.pageIndex, pagination.pageSize]
  )

  const canPreviousPage = table.getCanPreviousPage()
  const canGoNextPage = table.getCanNextPage()

  return (
    <div className="inline-block min-w-full p-1 align-middle">
      <div className="flex justify-between bg-white py-2">
        <PageOption
          pageSize={table.getState().pagination.pageSize}
          setPageSize={table.setPageSize}
        />

        <div className="flex items-center gap-x-4">
          <div>{children}</div>
          <div className="flex items-center gap-x-2">
            {table
              .getHeaderGroups()
              .map(headerGroup =>
                headerGroup.headers
                  .filter(h => h.column.columnDef?.meta?.isOptionFilter)
                  .map(header => (
                    <ColumnFilter
                      key={header.id}
                      label={flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      column={header.column}
                      minWidth={header.column.columnDef?.meta?.minWidth}
                    />
                  ))
              )}

            {table
              .getHeaderGroups()
              .map(headerGroup =>
                headerGroup.headers
                  .filter(
                    h => h.column.columnDef?.meta?.isCustomFilterComponent
                  )
                  .map(header =>
                    (
                      header.column.columnDef.meta as CustomFilterMeta
                    ).filterComponent({ column: header.column })
                  )
              )}
          </div>

          <div className="flex items-center gap-x-2">
            <label
              htmlFor="search"
              className="text-sm font-semibold text-gray-700"
            >
              ຄົ້ນຫາ
            </label>
            <DebouncedInput
              id="search"
              value={globalFilter ?? ""}
              onChange={value => setGlobalFilter(String(value))}
              className="form-input"
              placeholder={`ຈາກ ${
                table.getPrePaginationRowModel().rows.length
              } ລາຍການ...`}
            />
          </div>
        </div>
      </div>
      <table className="min-w-full overflow-hidden">
        <thead className="bg-zinc-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-800"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="py-0.5">
                        <div
                          {...{
                            className: clsx(
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "cursor-default",
                              "flex justify-between relative"
                            ),
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <TiArrowSortedUp className="h-5 w-5 text-zinc-500" />
                            ),
                            desc: (
                              <TiArrowSortedDown className="h-5 w-5 text-zinc-500" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id} className="border-b border-zinc-100">
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-3 py-3 text-sm text-gray-500"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-between bg-white py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            type="button"
            className={clsx(
              canPreviousPage
                ? "bg-white text-gray-700 hover:bg-gray-50"
                : "bg-gray-100 text-gray-500",
              "relative inline-flex w-16 items-center justify-center rounded-md border border-gray-300 py-2 text-sm font-medium"
            )}
            disabled={!canPreviousPage}
            onClick={() => table.previousPage()}
          >
            ກັບຄືນ
          </button>
          <button
            type="button"
            className={clsx(
              canGoNextPage
                ? "bg-white text-gray-700 hover:bg-gray-50"
                : "bg-gray-100 text-gray-500",
              "relative inline-flex w-16 items-center justify-center rounded-md border border-gray-300 py-2 text-sm font-medium"
            )}
            disabled={!canGoNextPage}
            onClick={() => table.nextPage()}
          >
            ຖັດໄປ
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span>ສະແດງໜ້າ </span>
              <strong>
                {table.getState().pagination.pageIndex + 1} {" ຈາກ "}
                {table.getPageCount()}
              </strong>
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                type="button"
                className={clsx(
                  canPreviousPage ? "bg-white hover:bg-gray-50" : "bg-gray-100",
                  "relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500 focus:z-20"
                )}
                onClick={() => table.setPageIndex(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                className={clsx(
                  canPreviousPage ? "bg-white hover:bg-gray-50" : "bg-gray-100",
                  "relative inline-flex items-center border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500 focus:z-20"
                )}
                onClick={() => table.previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {pages.map((page, idx) => {
                const bool = page === pagination.pageIndex + 1

                return (
                  <button
                    key={idx.toString()}
                    className={clsx(
                      bool
                        ? "z-10 border-black bg-zinc-50 text-black"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50",
                      "relative inline-flex w-12 items-center justify-center border text-sm font-medium"
                    )}
                    disabled={bool}
                    onClick={() => table.setPageIndex(page - 1)}
                  >
                    {page}
                  </button>
                )
              })}

              <button
                type="button"
                className={clsx(
                  canGoNextPage ? "bg-white hover:bg-gray-50" : "bg-gray-100",
                  "relative inline-flex items-center border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500 focus:z-20"
                )}
                onClick={() => table.nextPage()}
                disabled={!canGoNextPage}
              >
                <span className="sr-only">Next Page</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                className={clsx(
                  canGoNextPage ? "bg-white hover:bg-gray-50" : "bg-gray-100",
                  "relative inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 text-sm font-medium text-gray-500 focus:z-20"
                )}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!canGoNextPage}
              >
                <span className="sr-only">Next</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
