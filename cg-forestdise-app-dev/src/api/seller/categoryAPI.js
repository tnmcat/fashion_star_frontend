import api from '../appConfig';
const categoryAPI = {
    async findAll() {
        let result = null;
        try {
            result = await api.get(`/category/all`);
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
}

export default categoryAPI;
