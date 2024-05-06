import api from '../appConfig';

const optionValueAPI = {
    async findAll(optionId) {
        try {
            const response = await api.get(`seller/option-value/${optionId}/all`);
            console.log(optionId);
            console.log(response);
            return response;
        } catch (error) {
            console.log("Find option value API error: " + error);
            throw error;
        }
    },
    async add(data, optionId) {
        try {
            const response = await api.post(`seller/option-value/${optionId}/create`, data);
            console.log('At API: ' + response);
            return response.data;
        } catch (error) {
            console.log("Add option value API error: " + error);
            throw error;
        }
    },
    async update(data) {
        try {
            console.log('At API: ' + data);
            // const response = await api.put(`seller/options/${data.optionId}/update`, data);
            const response = await api.put(`seller/option-value/update/${data.optionValueId}`, data);
            console.log('At API: ' + response);
            return response;
        } catch (error) {
            console.log("Add option API error: " + error);
            throw error;
        }
    }
};

export default optionValueAPI;
