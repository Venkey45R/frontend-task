import { TableHeader } from './tableHeader'
import { TableRow } from './tableRow'
import { TableProps } from '@/types/table'

type Props = TableProps & {
  onRowClick?: (row: any) => void
}

export function Table({ columns, data, onRowClick }: Props) {
  return (
    <div className="overflow-x-auto mx-1 lg:mx-20 dark:border-white border-black border-2 max-w-9xl bg-gray-200 dark:bg-gray-700 rounded-lg flex justify-center">
      <table className="w-full">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
