import { Suspense } from "react"
import SecuritiesClient from "./SecuritiesClient"
import { Loader } from "@/components/common/loader"

export default function SecuritiesPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SecuritiesClient />
    </Suspense>
  )
}
