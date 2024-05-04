import api from './appConfig';

const optionValueAPI = {
    async findAll(optionId) {
        try {
            const response = await api.get(`options/${optionId}/values`);
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
            const response = await api.post(`options/${optionId}/values/create`, data);
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
            const response = await api.put(`options/values/${data.optionValueId}/update`, data);
            console.log('At API: ' + response);
            return response;
        } catch (error) {
            console.log("Add option API error: " + error);
            throw error;
        }
    }
};

export default optionValueAPI;
