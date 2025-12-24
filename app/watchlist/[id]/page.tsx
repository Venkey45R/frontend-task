"use client"

import { useParams, useRouter } from "next/navigation"
import { useWatchlistStore } from "@/app/store/watchListStore"
import { Table } from "@/components/table/table"
import { securitiesColumn } from "@/app/securitiesColumn"

export default function WatchlistDetails() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const watchlist = useWatchlistStore(
    state => state.watchlists.find(w => w.id === id)
  )

  const renameWatchlist = useWatchlistStore(state => state.renameWatchlist)
  const deleteWatchlist = useWatchlistStore(state => state.deleteWatchlist)
  const removeSecurity = useWatchlistStore(state => state.removeSecurity)

  if (!watchlist) {
    return <div className="p-6">Watchlist not found</div>
  }

  const watchlistSecuritiesColumns = [
    ...securitiesColumn,
    { key: "actions", value: "Actions" },
  ]

  const rows = watchlist.securities.map(sec => ({
    ...sec,
    actions: (
      <button
        onClick={() => removeSecurity(watchlist.id, sec.symbol)}
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    ),
  }))

  return (
    <div className="p-6">
      <div className="block lg:flex justify-between items-center mt-4 mb-8 mx-2 lg:mx-16">
        <h1 className="text-xl font-bold">{watchlist.name}</h1>

        <div className="flex gap-3 mt-4 lg:mt-0">
          <button
            onClick={() => {
              const newName = prompt("Enter new watchlist name", watchlist.name)
              if (newName && newName.trim()) {
                renameWatchlist(watchlist.id, newName.trim())
              }
            }}
            className="px-6 py-1 border-2 border-gray-700 dark:border-white cursor-pointer rounded-full dark:bg-gray-800 dark:text-gray-100 text-sm"
          >
            Rename
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this watchlist?")) {
                deleteWatchlist(watchlist.id)
                router.push("/watchlist")
              }
            }}
            
            className="px-6 py-1 border-2 border-gray-700 dark:border-white cursor-pointer rounded-full dark:bg-gray-800 dark:text-gray-100 text-sm"
          >
            Delete
          </button>

          <button
            onClick={() => router.push(`/securities?watchlistId=${id}`)}
            
            className="px-6 py-1 border-2 border-gray-700 dark:border-white rounded-full cursor-pointer dark:bg-gray-800 dark:text-gray-100 text-sm"
          >
            Add Securities
          </button>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-gray-500">
          No securities added to this watchlist yet.
        </p>
      ) : (
        <div className="flex justify-center">
          <Table columns={watchlistSecuritiesColumns} data={rows}/>
        </div>
      )}
    </div>
  )
}
