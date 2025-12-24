"use client"

import { CircleAlert } from "lucide-react"
import { useWatchlistStore } from "../store/watchListStore"
import { useRouter } from "next/navigation"
import { Table } from "@/components/table/table"
import { watchlistColumns } from "../watchlistColumn"

export default function Watchlist() {
  const router = useRouter()

  const watchlists = useWatchlistStore(state => state.watchlists)
  const rows = watchlists.map(w => ({
    id: w.id,
    name: w.name,
    count: w.securities.length,
  }))

  return (
    <div className="p-4 min-h-96">
      <div className="flex justify-between m-4 lg:m-8">
        <h1 className="text-md lg:text-2xl font-bold">
          Your Watchlist ({watchlists.length})
        </h1>

        <button
          onClick={() => router.push("/watchlist/add")}
          className="px-6 py-1 border-2 border-black dark:border-white rounded-full dark:bg-gray-800 dark:text-gray-100 text-sm cursor-pointer"
        >
          Add Watchlist
        </button>
      </div>

      {watchlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <CircleAlert size={32} className="text-red-400 mb-4" />
          <h2 className="text-xl mb-4">No Watchlists Available</h2>
          <p className="text-gray-600">
            Click the Add Watchlist button to create one.
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <Table columns={watchlistColumns} data={rows} onRowClick={(row) => router.push(`/watchlist/${row.id}`)} />
        </div>
      )}
    </div>
  )
}
