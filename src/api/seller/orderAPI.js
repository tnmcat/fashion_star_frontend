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
    async acceptOrder(orderId) {
        let result = null;
        try {
            result = await api.post(`seller/order/accept/${orderId}`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
    async cancelOrder(orderId) {
        let result = null;
        try {
            result = await api.post(`seller/order/cancel/${orderId}`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
    async deliverOrder(orderId) {
        let result = null;
        try {
            result = await api.post(`seller/order/deliver/${orderId}`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
    async completeOrder(orderId) {
        let result = null;
        try {
            result = await api.post(`seller/order/complete/${orderId}`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
}

export default orderApi;
