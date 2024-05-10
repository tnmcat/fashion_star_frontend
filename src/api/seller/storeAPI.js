import api from '../appConfig';
const storeApi = {
    async findStore(storeId) {
        let result = null;
        try {
            result = await api.get(`/store/${storeId}`);
        } catch (e) {
            console.log("Find seller API error: " + e);
        }
        return result;
    },
    async getStoreBySellerId(sellerId) {
        let result = null;
        console.log('at api' + sellerId);
        try {
            result = await api.get(`/seller/store/${sellerId}`);
            console.log('at api' + result);
        } catch (e) {
            console.log("Get stores by seller ID API error: " + e);
        }
        return result;
    },
    async updateStore(storeId, storeData) {
        try {
            console.log('Address data in api:', storeData);
            const response = await api.put(`seller/store/update/${storeId}`, storeData);
            console.log('Address response in api:', response);
            return response;
        } catch (error) {
            console.log("Update address API error:", error);
            throw error;
        }
    },



}

export default storeApi;
