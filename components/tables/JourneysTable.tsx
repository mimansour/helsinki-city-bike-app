import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table'
import { Journey } from '@prisma/client'
import ArrowIconButton from 'components/general/ArrowIconButton'

export default function JourneysTable({
  data,
  columns,
  onSorting,
}: {
  data: Journey[]
  columns: ColumnDef<Journey, any>[]
  onSorting: (headerId: string) => void
}) {
  const table = useReactTable<Journey>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <table className="text-left text-gray-500 shadow-sm">
        <thead className="text-gray-700 uppercase bg-neutral-100 md:text-base text-xs">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="md:px-6 py-4 px-2"
                  >
                    <div className="flex w-32 md:w-auto gap-x-2 md:gap-x-4">
                      <span className="w-min md:w-auto">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <ArrowIconButton
                        ariaLabel={header.id}
                        onClick={() => onSorting(header.id)}
                      />
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="bg-white border-b md:text-base text-xs">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="md:px-6 px-2 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { createColumnHelper }
