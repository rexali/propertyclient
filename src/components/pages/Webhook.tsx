'use client'

import React from "react";
import { useSearchParams } from "react-router-dom";
import { updatePaymentInfoAPI } from "./payment/updatePaymentInfoAPI";
import { verifyPaymentAPI } from "./payment/verifyPaymentAPI";

export default function Webhook() {

    const [result, setResult] = React.useState<any>({});
    const [searchParams, _] = useSearchParams();
    const reference = searchParams.get("reference") || window.localStorage.getItem("reference");

    React.useEffect(() => {
        ( async () => {
            try {
                // TO DO 1: use reference to query paystack
                let result = await verifyPaymentAPI(reference);
                setResult(result);
                console.log(result);

                let checkoutData = JSON.parse(window.localStorage.getItem('checkoutData') || '') as {
                    checkIn: string;
                    checkOut: string;
                    roomId: string;
                    roomPrice: number;
                    userId: string;
                    BookingId: string;
                }

                if (result?.event === 'charge.success' && result.data.status === 'success') {
                    // TO DO 2: send  result or support data to database transaction table
                    console.log(result?.data?.customer?.id);
                    
                    await updatePaymentInfoAPI({
                        // totalPrice: checkoutData.roomPrice,
                        // UserId: checkoutData.userId,
                        // RoomId: checkoutData.roomId,
                        // checkIn: checkoutData.checkIn,
                        // checkOut: checkoutData.checkOut,
                        status: 'confirmed',
                        paymentStatus: 'paid',
                        BookingId: checkoutData?.BookingId
                    });
                }
            } catch (error) {
                console.warn(error);
            }
        })();

    }, [reference])

    if (result.data.status==='success') {

        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
                <p style={{ color: "orange" }}>Transaction failed: {result.data.status}</p>
            </div>
        )
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400, }}>
            <p>Transaction successful: {result.data.status}</p>
        </div>
    )
}
