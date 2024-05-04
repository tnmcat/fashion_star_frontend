import axios from "axios";

const ORDER_MANAGEMENT_API = "http://localhost:5454/api";

export const apiCreateOrder = async (reqData) => {
    reqData.storeId = 1;
    try {
        const result = await axios.post(
            `${ORDER_MANAGEMENT_API}/orders/create1`,
            reqData
        );
        console.log(result);
        if (result.status === 200) {
            console.log("created order - ", reqData);
            return result.data;
        } else {
            console.log("Order creation failed", result);
            throw new Error("Order creation failed"); // Ném lỗi khi tạo order không thành công
        }
    } catch (error) {
        console.error("catch error", error);
        throw error; // Ném lỗi để bắt và xử lý ở bên ngoài
    }
};

export const apiGetOrderById =
    ({orderId, userId}) =>
    async () => {
        let result = null;
        console.log("get order req", orderId);
        console.log("get userID req", userId);
        try {
            result = await axios.get(
                `${ORDER_MANAGEMENT_API}/${orderId}/${userId}`
            );
        } catch (error) {
            console.log("find Order_id API error: " + error);
        }
        return result;
    };

export const apiOrderHistory = async (userId) => {
    let result = null;
    try {
        result = await axios.get(`${ORDER_MANAGEMENT_API}/orders/${userId}`);
    } catch (e) {
        console.log("Failed to fetch order history:", e);
        throw e; // Ném lỗi để xử lý trong Thunk
    }
    console.log("result", result);
    console.log(`${ORDER_MANAGEMENT_API}/orders/${userId}`);
    return result;
};
