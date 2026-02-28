'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { message } from "antd"
import { updateData } from "@/FBConfig/fbFunctions"
import { User } from "@/types/user"

export default function PaymentResultClient() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const paymentMethod: any = searchParams.get('paymentMethod')
    const [status, setStatus] = useState<string>("Processing payment...")

    useEffect(() => {
        const responseCode = searchParams.get("pp_ResponseCode")
        const txnRef = searchParams.get("pp_TxnRefNo")

        if (!responseCode) return setStatus("Invalid payment response.")

        if (responseCode === "000") {
            setStatus("Payment Successful! Updating subscription...")

            const storedUser = localStorage.getItem("userInfo")
            if (storedUser) {
                const user: User = JSON.parse(storedUser)

                const updatedSubscription = {
                    txnRef,
                    packageName: "Ultimate Package",
                    status: "active",
                    paymentMethod,
                    startAt: new Date().toISOString(),
                    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                }

                updateData(`users/${user.uid}`, { subscription: updatedSubscription })
                    .then(() => message.success("Subscription activated!"))
                    .catch(() => message.error("Failed to activate subscription."))
            }
        } else {
            setStatus("Payment Failed. Try again.")
        }
    }, [searchParams, paymentMethod])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-xl font-semibold">{status}</h1>
        </div>
    )
}