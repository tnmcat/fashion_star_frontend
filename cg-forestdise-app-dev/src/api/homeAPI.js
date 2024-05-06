import axios from "axios";

// const HOME_MANAGEMENT_API = "https://forestdise.up.railway.app/api";
const HOME_MANAGEMENT_API = "http://localhost:5454/api";

export const findProducts = async () => {
    let result = null;
    try {
        result = await axios.get(`${HOME_MANAGEMENT_API}/products`);
    } catch (e) {
        console.log("Find products API error: " + e);
    }
    return result;
};
