import api from '../appConfig';
const orderApi = {
    async findOrder(orderId) {
        let result = null;
        try {
            result = await api.get(`seller/order/details/${orderId}`);
        } catch (e) {
            console.log("Find order API error: " + e);
        }
        return result;
    },
    async getOrdersByUserId(userId) {
        let result = null;
        try {
            result = await api.get(`user/order/${userId}/all`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
    async getOrdersByStoreId(storeId) {
        let result = null;
        try {
            result = await api.get(`seller/order/${storeId}/all`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
    async updateOrder(orderId, data) {
        let result = null;
        try {
            result = await api.post(`seller/order/update/${orderId}`, data);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
}

export default orderApi;
