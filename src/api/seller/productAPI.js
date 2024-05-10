import api from '../appConfig';
const productAPI = {
    async findByStoreId(storeId) {
        let result = null;
        try {
            result = await api.get(`/products/${storeId}/all`);
            console.log(storeId)
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
    async findById(productId) {
        let result = null;
        try {
            result = await api.get(`/seller/product/details/${productId}`);
            console.log(productId)
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
    async findByStoreCategoryId(storeCategoryId) {
        let result = null;
        try {
            result = await api.get(`store-category/${storeCategoryId}/products/all`);
            console.log(storeCategoryId)
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
    async add(data, storeId) {
        try {
            console.log('at api', data);
            const result = await api.post(`seller/product/${storeId}/create`, data);
            console.log('at api', result);
            return result;
        } catch (e) {
            console.log("add stores cate API error: " + e);
        }

    },
    async update(productId, data) {
        try {
            const result = await api.put(`seller/product/update/${productId}`, data);
            console.log('at api', result);
            return result;
        } catch (e) {
            console.log("add stores cate API error: " + e);
        }

    },



}

export default productAPI;
