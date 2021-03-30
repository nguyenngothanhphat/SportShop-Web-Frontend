import axios from "axios";
import { API } from '../../config'

export const getOrders = async (authtoken) =>
    await axios.get(`${API}/admin/orders`, {
        headers: {
            authtoken,
        },
    });

export const changeStatus = async (orderId, orderStatus, authtoken) =>
    await axios.put(
        `${API}/admin/order-status`,
        { orderId, orderStatus },
        {
            headers: {
                authtoken,
            },
        }
    );
