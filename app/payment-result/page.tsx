import { Suspense } from "react"
import PaymentResultClient from "../../components/PaymentResultClient"

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
            <h1>Loading payment result...</h1>
        </div>}>
            <PaymentResultClient />
        </Suspense>
    )
}