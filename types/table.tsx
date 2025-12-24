export type TableColumn = {
  key: string
  value: string
}

export type TableProps = {
  columns: TableColumn[]
  data: any[]
}

export type CellProps = {
  value: any,
  columnKey?: string
}