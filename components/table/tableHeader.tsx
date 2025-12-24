import { TableColumn } from '@/types/table'

type Props = {
  columns: TableColumn[]
}
export function TableHeader({ columns }: Props) {
  return (
    <thead>
      <tr>
        {columns.map(col => (
          <th
            key={col.key}
            className="text-center py-3 px-2 lg:px-10 border-b font-medium  bg-gray-400 dark:bg-gray-800"
          >
            {col.value}
          </th>
        ))}
      </tr>
    </thead>
  )
}
