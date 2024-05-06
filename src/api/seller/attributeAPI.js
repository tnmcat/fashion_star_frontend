import api from '../appConfig';

const attributeAPI = {
    async findAll(productId) {
        try {
            const response = await api.get(`products/${productId}/details/attributes`);
            console.log(productId);
            console.log(response);
            return response;
        } catch (error) {
            console.log("Find attribute API error: " + error);
            throw error;
        }
    },
    async add(data, productId) {
        try {
            const response = await api.post(`seller/attribute/${productId}/create`, data);
            console.log('At API: ' + response);
            return response;
        } catch (error) {
            console.log("Add attribute API error: " + error);
            throw error;
        }
    },
    async update(data) {
        try {
            console.log('At API: ' + data);
            const response = await api.put(`seller/attribute/update/${data.attributeId}`, data);
            console.log('At API: ' + response);
            return response;
        } catch (error) {
            console.log("Add attribute API error: " + error);
            throw error;
        }
    },
    async delete(attributeId) {
        try {
            await api.delete(`seller/attribute/delete/${attributeId}`);
        } catch (error) {
            console.log("Find attribute API error: " + error);
            throw error;
        }
    },
};

export default attributeAPI;
