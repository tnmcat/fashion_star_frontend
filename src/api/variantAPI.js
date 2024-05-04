import api from './appConfig';

const variantAPI = {
    async findAll(productId) {
        try {
            const response = await api.get(`products/${productId}/details/variants`);
            return response;
        } catch (error) {
            console.log("Find variant API error: " + error);
            throw error;
        }
    },
    async add(productId) {
        try {
            const response = await api.post(`seller/product/${productId}/variants/create`);
            return response;
        } catch (error) {
            console.log("Add variant API error: " + error);
            throw error;
        }
    },
    async update(variantId, data) {
        try {
            const response = await api.post(`seller/variants/${variantId}/update`, data);
            return response;
        } catch (error) {
            console.log("Add variant API error: " + error);
            throw error;
        }
    },
    async delete(variantId) {
        try {
            const response = await api.delete(`seller/variants/${variantId}/delete`);
            return response;
        } catch (error) {
            console.log("Add variant API error: " + error);
            throw error;
        }
    }
};

export default variantAPI;
