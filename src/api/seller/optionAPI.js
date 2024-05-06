import api from '../appConfig';

const optionAPI = {
    async findAll(productId) {
        try {
            const response = await api.get(`products/${productId}/details/options`);
            console.log(productId);
            console.log(response);
            return response;
        } catch (error) {
            console.log("Find option API error: " + error);
            throw error;
        }
    },
    async add(data, productId) {
        try {
            const response = await api.post(`seller/option/${productId}/create`, data);
            console.log('At API: ' + response);
            return response;
        } catch (error) {
            console.log("Add option API error: " + error);
            throw error;
        }
    },
    async update(data) {
        try {
            console.log('At API: ' + data);
            const response = await api.put(`seller/option/update/${data.optionId}`, data);
            console.log('At API: ' + response);
            return response;
        } catch (error) {
            console.log("Add option API error: " + error);
            throw error;
        }
    }
};

export default optionAPI;
