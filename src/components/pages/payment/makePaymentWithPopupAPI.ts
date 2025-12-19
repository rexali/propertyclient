
import { toast } from "sonner";
import { config } from "../../../config/config";
import { postPaymentInfoAPI } from "./postPaymentInfoAPI";
import PaystackPop from "@paystack/inline-js";
import { ResponseType } from "../../../types";
import { postPaymentInfoAPI2 } from "./postPaymentInfoAPI2";

export async function makePaymentWithPopupAPI(data: { amount: any, propertyId: any, userId: any, email: any, items?: Array<any> }) {

    try {
        // const _csrf = window.localStorage.getItem('csrf') as string;
        // let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/get_transaction_url`, {
        //     body: JSON.stringify({ ...data, amount: Number(data.amount) * 100 }),
        //     method: "POST",
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "X-XSRF-TOKEN": _csrf
        //     }
        // });

        let trnxStatus: boolean = false;
        // let result = await response.json() as ResponseType;

        // if (result.status !== 'success') {
        if (true) {

            if (typeof window !== "undefined") {
                // save refrence
                // window.localStorage.setItem('access_code', result.data.access_code);
                // const popup = new PaystackPop();
                // popup.resumeTransaction(result.data.access_code, {
                //     onSuccess: async (transaction) => {
                //         console.log(transaction);
                //         // get saved checkout data
                        let checkoutData = JSON.parse(window.localStorage.getItem('checkoutData') || '') as {
                            checkIn: string;
                            checkOut: string;
                            propertyId: string;
                            propertyPrice: number;
                            userId: string;
                        }
                        // send payment info db and confirm later
                        let res;
                        if (data.items?.length) {
                             res = await postPaymentInfoAPI2({
                            totalPrice: data.amount || checkoutData.propertyPrice,
                            UserId: data.userId,
                            PropertyId: data.propertyId || checkoutData.propertyId,
                            checkIn: checkoutData.checkIn,
                            checkOut: checkoutData.checkOut,
                            status: "confirmed", // pending, confirmed, canceled
                            paymentStatus: "paid", //paid
                            items: data.items?.map(it => ({ ...it, status: "confirmed", paymentStatus: "paid" }))
                        });
                        } else{
                            res = await postPaymentInfoAPI({
                            totalPrice: data.amount || checkoutData.propertyPrice,
                            UserId: data.userId,
                            PropertyId: data.propertyId || checkoutData.propertyId,
                            checkIn: checkoutData.checkIn,
                            checkOut: checkoutData.checkOut,
                            status: "confirmed", // pending, confirmed, canceled
                            paymentStatus: "paid", //paid
                        });
                        }
                        

                        window.localStorage.removeItem('checkoutData');
                        window.localStorage.setItem('checkoutData', JSON.stringify({
                            ...checkoutData,
                            BookingId: res.data.booking.id
                        }));
                        // set status
                        trnxStatus = res.status;

                        if (res.status) {
                            console.log("Payment info sent. Wait for confirmation")
                            toast("Payment info sent. Wait for confirmation")
                            trnxStatus = res.status

                        } else {
                            console.log('Sending payment info failed')
                            toast('Sending payment info failed');
                            trnxStatus = res.status
                        }
                    // },
                //     onCancel: () => {
                //         console.log('Transaction canceled');
                //         toast('Transaction canceled!')
                //     },
                //     onError: (error) => {
                //         console.log(error.message);
                //         toast('Error! ' + error.message)
                //     },
                //     onLoad: (response) => {
                //         console.log(response);
                //     }

                // });

            }

        } else {
            // toast('Error! Sending payment info failed: ' + result.message)
        }

        return trnxStatus;
    } catch (error: any) {
        console.warn(error);
        toast('Error! Sending payment info failed: ' + error.message)
    }
};

//         {
//   status: true,
//   message: 'Authorization URL created',
//   data: {
//     authorization_url: 'https://checkout.paystack.com/wh53fg5m4it39vd',
//     access_code: 'wh53fg5m4it39vd',  // for popup
//     reference: 'mf5ud0bu7t'    // for redirect and verification
//   }
// }