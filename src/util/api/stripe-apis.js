import axios from "axios";
import { API } from '../../config';

export const createPaymentIntent = (authtoken, coupon) => {
    return axios.post(`${API}/create-payment-intent`, {couponApplied: coupon}, {
        headers: {
            authtoken,
        }
    })
}