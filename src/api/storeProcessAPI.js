import api from "./appConfig";

const storeProcessAPI = {
    async findStoreProcess() {
        let result = null;
        try {
            result = await api.get(`/admins/store-request`);
            console.log("RESULETE admin API : ", result);
            return result;
        } catch (e) {
            console.log("Find admin API error: " + e);
        }
    },
    async sendReply(store_id, data) {

        let result = null;
        try {
            console.log("at api: ", store_id);
            console.log("at api: ", data);
            result = await api.post(`/admins/store-request/${store_id}/process`, data);
            console.log("at api: ", result);
        } catch (e) {
            console.log("API error: " + e);
        }
        return result;
    },
}

export default storeProcessAPI;