import { CellProps } from "@/types/table";
export function TableCell({ value, columnKey }: CellProps) {
  let format = (typeof value === "number"  && !Number.isInteger(value)) ? value.toFixed(2) : value;
  let textColor = "dark:text-white text-black"
  if(columnKey === "pnl"){
    if(value > 0){
      textColor = "dark:text-green-400 text-green-700 font-bold"
    }
    else if(value < 0){
      textColor = "dark:text-red-400 text-red-700 font-bold"
    }
  }

  if(Array.isArray(value)){
    format = value.join(', ');
  }
  return (
    <td className={`p-1 lg:p-2 border-b border-gray-400 text-center text-xs ${textColor}`}>
      {format}
    </td>
  )
}
