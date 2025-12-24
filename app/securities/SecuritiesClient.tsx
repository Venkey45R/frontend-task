"use client"

import { useEffect, useMemo, useState } from "react"
import { Table } from "@/components/table/table"
import { fetcher } from "@/lib/securitiesFetcher"
import { adaptSecurityResponse } from "@/lib/securityAdapter"
import { securitiesColumn } from "../securitiesColumn"
import { ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWatchlistStore } from "../store/watchListStore"
import { Loader } from "@/components/common/loader"

export default function SecuritiesClient() {
  const [rows, setRows] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [typeFilter, setTypeFilter] =
    useState<"ALL" | "EQ" | "PE" | "CE" | "FUT">("ALL")
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const watchlistId = searchParams.get("watchlistId")

  const addSecurity = useWatchlistStore(state => state.addSecurity)

  useEffect(() => {
    fetcher().then(data => {
      setRows(adaptSecurityResponse(data))
      setIsLoading(false)
    })
  }, [])

  const filteredRows = useMemo(() => {
    let filtered = rows

    if (search.trim()) {
      filtered = filtered.filter(row =>
        row.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (typeFilter !== "ALL") {
      filtered = filtered.filter(
        row => row.instrument_type === typeFilter
      )
    }

    return filtered
  }, [rows, search, typeFilter])

  const filter = (type: "ALL" | "EQ" | "PE" | "CE" | "FUT") => {
    setTypeFilter(type)
    setShowDropdown(false)
  }

  if (isLoading) return <Loader />

  return (
    <main>
      {/* HEADER + SEARCH + FILTER */}
      <div className="block lg:flex justify-between mx-10 my-5">
        <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">
          Securities
        </h1>

        <div className="flex justify-around gap-4 lg:gap-10">
          {/* SEARCH */}
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-40 py-2 pl-3 text-sm rounded-md border-2 border-blue-600
                         focus:outline-none dark:bg-white dark:text-gray-800"
            />
          </div>

          {/* FILTER */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center gap-2 rounded-md border border-blue-500
                       bg-blue-500 px-3 py-1.5 text-sm font-medium text-white
                       hover:bg-blue-600"
          >
            <span>Type</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* FILTER DROPDOWN */}
        <div
          className={`absolute mt-12 right-10 bg-black border border-gray-300
                      rounded shadow-lg z-10 ${
                        showDropdown ? "block" : "hidden"
                      }`}
        >
          <ul>
            <li className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => filter("ALL")}>All</li>
            <li className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => filter("EQ")}>Equity</li>
            <li className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => filter("CE")}>Call Option</li>
            <li className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => filter("PE")}>Put Option</li>
            <li className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
                onClick={() => filter("FUT")}>Future</li>
          </ul>
        </div>
      </div>

      {/* TABLE */}
      <div className="mx-0 lg:mx-2 flex justify-center">
        <Table
          columns={securitiesColumn}
          data={filteredRows}
          onRowClick={(row) => {
            if (!watchlistId) return
            addSecurity(watchlistId, row)
            router.push(`/watchlist/${watchlistId}`)
          }}
        />
      </div>
    </main>
  )
}
