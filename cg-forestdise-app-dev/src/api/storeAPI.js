import axios from "axios";
// const STORE_MANAGEMENT_API = "https://forestdise.up.railway.app/api/stores";
const STORE_MANAGEMENT_API = "http://localhost:5454/api/stores";

export const findStore = async (storeId) => {
    let result = null;
    try {
        result = await axios.get(`http://localhost:5454/api/stores/${storeId}`);
    } catch (e) {
        console.log("Find store API error: " + e);
    }
    return result;
};
