import { TableCell } from "./tableCell"

type Props = {
  row: any
  columns: { key: string; value: string }[]
  onClick?: () => void
}

export function TableRow({ row, columns, onClick }: Props) {
  return (
    <tr
      onClick={onClick}
      className={onClick ? "cursor-pointer hover:bg-gray-400" : ""}
    >
      {columns.map(col => (
        <TableCell key={col.key} value={row[col.key]} columnKey={col.key} />
      ))}
    </tr>
  )
}
