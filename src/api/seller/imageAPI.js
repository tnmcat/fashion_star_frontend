import api from '../appConfig';

const imageAPI = {

    async delete(imageId) {
        try {
            await api.delete(`/seller/image/delete/${imageId}`);
        } catch (error) {
            console.log("Delete API error: " + error);
            throw error;
        }
    }
};

export default imageAPI;
