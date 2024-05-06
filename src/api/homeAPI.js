import axios from "axios";

// const HOME_MANAGEMENT_API = "https://forestdise.up.railway.app/api";
const HOME_MANAGEMENT_API = "http://localhost:5454/api";

// export const findProducts = async () => {
//     let result = null;
//     try {
//         result = await axios.get(`${HOME_MANAGEMENT_API}/products`);
//     } catch (e) {
//         console.log("Find products API error: " + e);
//     }
//     return result;
// };

export const findProducts = async (filters = {}) => {
    const {
        colors = "",
        sizes = "",
        minPrice = "",
        maxPrice = "",
        minDiscount = "",
        category = "",
        stock = "",
        sort = "",
        pageNumber = "",
        pageSize = "",
    } = filters;

    let query = `/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    let result = null;
    try {
        result = await axios.get(`${HOME_MANAGEMENT_API}${query}`);
    } catch (e) {
        console.log("Find products API error: " + e);
    }
    return result;
};
