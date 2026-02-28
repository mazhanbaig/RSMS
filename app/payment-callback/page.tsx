'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentCallback() {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const responseCode = params.get("pp_ResponseCode");
        const paymentMethod = params.get("paymentMethod");

        router.push(`/payment-result?pp_ResponseCode=${responseCode}&pp_TxnRefNo=${params.get("pp_TxnRefNo")}&paymentMethod=${paymentMethod}`);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h2>Processing payment...</h2>
        </div>
    );
}