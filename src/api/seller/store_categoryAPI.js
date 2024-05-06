import api from '../appConfig';
const store_categoryAPI = {
    async findAll(storeId) {
        let result = null;
        try {
            result = await api.get(`/store-category/${storeId}/all`);
            console.log(storeId)
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
    async add(data, storeId) {
        let result = null;
        try {
            const result = await api.post(`/store-category/${storeId}/create`, data);
            console.log('at api' + result);
        } catch (e) {
            console.log("add stores cate API error: " + e);
        }
        return result;
    },



}

export default store_categoryAPI;
