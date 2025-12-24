"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWatchlistStore } from "@/app/store/watchListStore"

export default function AddWatchlist() {
  const router = useRouter()
  const createWatchlist = useWatchlistStore(
    state => state.createWatchlist
  )
  const watchlistsCount = useWatchlistStore(
    state => state.watchlists.length
  )

  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Watchlist name is required")
      return
    }

    if (watchlistsCount >= 10) {
      setError("You can create a maximum of 10 watchlists")
      return
    }

    createWatchlist(name.trim())
    router.push("/watchlist")
  }

  return (
    <div className="max-w-md mt-20 mx-2 lg:mx-auto p-6 border rounded-lg mb-20">
      <h1 className="text-2xl font-bold mb-4">
        Create Watchlist
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Watchlist Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value)
              setError("")
            }}
            placeholder="e.g. Long Term Stocks"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.push("/watchlist")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
