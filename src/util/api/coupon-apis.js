import axios from "axios";
import { API } from '../../config'

export const getCoupons = async () =>
    await axios.get(`${API}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
    await axios.delete(`${API}/coupon/${couponId}`, {
        headers: {
            authtoken,
        },
    });

export const createCoupon = async (coupon, authtoken) =>
    await axios.post(
        `${API}/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        }
    );
