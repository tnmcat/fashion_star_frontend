import api from '../appConfig';
const categoryAPI = {
    async findAllMainCategories() {
        let result = null;
        try {
            result = await api.get(`/category/main-cate/all`);
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
    async findAllParentCategories(main_cate_id) {
        let result = null;
        try {
            result = await api.get(`/category/main-cate/${main_cate_id}`);
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
    async findAllCategories(parent_cate_id) {
        let result = null;
        try {
            result = await api.get(`/category/main-cate/parent-cate/${parent_cate_id}`);
            console.log(result)
        } catch (e) {
            console.log("Find store-category API error: " + e);
        }
        return result;
    },
}

export default categoryAPI;
