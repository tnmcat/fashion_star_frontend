import api from '../appConfig';

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
    async findByProductIdAndValueIds(productId, optionValueIds) {
        try {
            console.log(productId);
            console.log(optionValueIds);

            // Send a POST request to the API endpoint with productId in the URL and optionValueIds in the request body
            const response = await api.post(`/seller/product-detail/${productId}`, { optionValueIds });
            console.log(response);
            return response; // Assuming the response contains the data you need

        } catch (error) {
            console.log("Find variant API error: " + error);
            throw error;
        }
    },

    async add(productId) {
        try {
            const response = await api.post(`seller/variant/${productId}/create`);
            return response;
        } catch (error) {
            console.log("Add variant API error: " + error);
            throw error;
        }
    },
    async update(variantId, data) {
        try {
            const response = await api.post(`seller/variant/update/${variantId}`, data);
            return response;
        } catch (error) {
            console.log("Add variant API error: " + error);
            throw error;
        }
    },
    async delete(variantId) {
        try {
            const response = await api.delete(`seller/variant/delete/${variantId}`);
            return response;
        } catch (error) {
            console.log("Add variant API error: " + error);
            throw error;
        }
    }
};

export default variantAPI;
