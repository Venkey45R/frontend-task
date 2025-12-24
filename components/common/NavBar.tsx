import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

export function NavBar() {
  return (
    <div className="max-w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white border-b py-3 px-4 lg:px-10 h-16 flex justify-between">
      <Link href="/" className="dark:text-white text-black text-md lg:text-xl font-bold my-auto ml-4">
        Portfolio Analyser
      </Link>
      <div className="flex justify-between gap-4 lg:gap-10">
        <Link
          href="/watchlist"
          className="text-blue-800 dark:text-blue-400 hover:underline my-auto lg:text-md text-sm"
        >
          WatchList
        </Link>
        <Link
          href="/securities"
          className="text-blue-800 dark:text-blue-400 hover:underline my-auto lg:text-md text-sm"
        >
          Securities
        </Link>
        <ToggleTheme />
      </div>
    </div>
  );
}
