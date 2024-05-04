
import api from './appConfig';
const sellerApi = {
    async findSeller(sellerId, token) {
        let result = null;
        try {
            result = await api.get(`sellers/${sellerId}`, {
                headers: { Authorization: "Bearer " + token },
            });
        } catch (e) {
            console.log("Find seller API error: " + e);
        }
        return result;
    },
    async updateSeller(sellerId, data) {
        let result = null;
        try {
            result = await api.post(`sellers/${sellerId}/update-profile`, data);
        } catch (e) {
            console.log("Find seller API error: " + e);
        }
        return result;
    },

    async registerSeller(data) {

        let result = null;
        try {
            console.log("REGISTER seller API : " + data);
            const url = '/auth/seller/register';
            return await api.post(url, data)
        } catch (e) {
            console.log("Find seller API error: " + e);
        }
        return result;
    },
    async loginSeller(data) {

        let result = null;
        try {
            const url = '/auth/seller/login';
            result = await api.post(url, data);
            console.log("login seller token: " + result);
        } catch (e) {
            console.log("Find seller API error: " + e);
        }
        return result;
    }

}

export default sellerApi;
