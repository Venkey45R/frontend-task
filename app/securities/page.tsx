"use client";
import { Table } from "@/components/table/table";
import { fetcher } from "@/lib/securitiesFetcher";
import { adaptSecurityResponse } from "@/lib/securityAdapter";
import { useEffect, useMemo, useState } from "react";
import { securitiesColumn } from "../securitiesColumn";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useWatchlistStore } from "../store/watchListStore";
import { Loader } from "@/components/common/loader";

export default function Securities() {
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [typeFilter, setTypeFilter] = useState<
    "ALL" | "EQ" | "PE" | "CE" | "FUT"
  >("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const watchlistId = searchParams.get("watchlistId");
  const addSecurity = useWatchlistStore((state) => state.addSecurity);

  useEffect(() => {
    fetcher().then((data) => {
      setRows(adaptSecurityResponse(data));
      setIsLoading(false);
    });
  }, []);

  const filteredRows = useMemo(() => {
    if (!search.trim() && typeFilter === "ALL") {
      return rows;
    }
    let filtered = rows;
    console.log(rows);
    if (search.trim()) {
      filtered = filtered.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (typeFilter !== "ALL") {
      filtered = filtered.filter((row) => row.instrument_type === typeFilter);
    }
    return filtered;
  }, [search, rows, typeFilter]);

  const filter = (type: "ALL" | "EQ" | "PE" | "CE" | "FUT") => {
    setTypeFilter(type);
    setShowDropdown(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <div className="block lg:flex justify-between mx-10 my-5">
        <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Securities</h1>
        <div className="flex justify-around gap-4 lg:gap-10">
          <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="Search" className="hidden">
              Search
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="button"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 dark:text-gray-800"
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-white border-2 border-blue-600 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-blue-600"
              />
            </div>
          </fieldset>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center gap-2 rounded-md border border-blue-500 bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 active:scale-[0.98]">
            <span>Type</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <div
          className={`absolute mt-12 right-10 bg-black border border-gray-300 rounded shadow-lg z-10 ${
            showDropdown ? "block" : "hidden"
          }`}
        >
          <ul>
            <li
              className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                filter("ALL");
              }}
            >
              All
            </li>
            <li
              className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => filter("EQ")}
            >
              Equity
            </li>
            <li
              className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => filter("CE")}
            >
              Call Option
            </li>
            <li
              className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => filter("PE")}
            >
              Put Option
            </li>
            <li
              className="px-10 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => filter("FUT")}
            >
              Future
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-0 lg:mx-2 flex justify-center">
        <Table
          columns={securitiesColumn}
          data={filteredRows}
          onRowClick={(row) => {
            if (!watchlistId) return;
            addSecurity(watchlistId, row);
            router.push(`/watchlist/${watchlistId}`);
          }}
        />
      </div>
    </main>
  );
}
