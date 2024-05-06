import axios from "axios";

const STORECATE_MANAGEMENT_API = "http://localhost:5454/api/store-category";
// const STORECATE_MANAGEMENT_API =
//   "https://forestdise.up.railway.app/api/store-category";

export const createCategory = async (category) => {
    let result = null;
    try {
        result = await axios.post(`${STORECATE_MANAGEMENT_API}`, category);
    } catch (e) {
        console.log("create book API error: " + e);
    }
    return result;
};
export const createCategoryList = async ({categoryList, storeId}) => {
    let result = null;
    try {
        result = await axios.post(
            `http://localhost:5454/api/store-category/${storeId}`,
            categoryList
        );
        console.log(result);
    } catch (e) {
        console.log("create categoryList API error: " + e);
    }
    return result;
};
