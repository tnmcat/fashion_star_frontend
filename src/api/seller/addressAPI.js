import api from '../appConfig';

const addressAPI = {
    async findAllByUserId(userId) {
        try {
            const response = await api.get(`address/user/${userId}`);
            return response;
        } catch (error) {
            console.log("Find all addresses by user ID API error: " + error);
            throw error;
        }
    },
    async findAllBySellerId(sellerId) {
        try {
            const response = await api.get(`address/seller/${sellerId}`);
            return response;
        } catch (error) {
            console.log("Find all addresses by user ID API error: " + error);
            throw error;
        }
    },
    async createUserAddress(userId, addressData) {
        try {
            const response = await api.post(`address/seller/${userId}/add`, addressData);
            return response;
        } catch (error) {
            console.log("Create address API error: " + error);
            throw error;
        }
    },
    async createSellerAddress(sellerId, addressData) {
        try {
            const response = await api.post(`address/seller/${sellerId}/add`, addressData);
            return response;
        } catch (error) {
            console.log("Create address API error: " + error);
            throw error;
        }
    },
    async update(addressId, data) {
        try {
            console.log('Address data in api:', data);
            const response = await api.put(`address/${addressId}/update`, data);
            console.log('Address response in api:', response);
            return response;
        } catch (error) {
            console.log("Update address API error:", error);
            throw error;
        }
    },

    async delete(addressId) {
        try {
            await api.delete(`address/${addressId}/delete`);
        } catch (error) {
            console.log("Delete address API error: " + error);
            throw error;
        }
    }
};

export default addressAPI;
