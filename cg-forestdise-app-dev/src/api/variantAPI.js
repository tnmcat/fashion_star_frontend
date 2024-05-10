import axios from "axios";
// const VARIANT_MANAGEMENT_API = "https://forestdise.up.railway.app/api";
const VARIANT_MANAGEMENT_API = "http://localhost:5454/api";

export const findVariant = async (variantId) => {
    let result = null;
    try {
        result = await axios.get(
            `http://localhost:5454/api/product-detail/variant/${variantId}`
        );
    } catch (e) {
        console.log("Find variant API error: " + e);
    }
    return result;
};

export const findVariantById = async (variantId) => {
    let result = null;
    try {
        result = await axios.get(
            `http://localhost:5454/api/variant/${variantId}`
        );
    } catch (e) {
        console.log("Find variant API error: " + e);
    }
    return result;
};

export const findAll = async (productId) => {
    try {
        const response = await axios.get(
            `http://localhost:5454/api/product-detail/${productId}/details/options`
        );
        console.log(productId);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("Find option API error: " + error);
        throw error;
    }
};

export const findByProductIdAndValueIds = async (productId, optionValueIds) => {
    try {
        console.log(productId);
        console.log(optionValueIds);

        // Send a POST request to the API endpoint with productId in the URL and optionValueIds in the request body
        const response = await axios.post(
            `http://localhost:5454/api/product-detail/${productId}`,
            {
                optionValueIds,
            }
        );
        console.log(response.data);
        return response.data; // Assuming the response contains the data you need
    } catch (error) {
        console.log("Find variant API error: " + error);
        throw error;
    }
};

export const updateVariantAfterCreate = async ({variant, variantId}) => {
    let result = null;
    try {
        result = await axios.put(
            `http://localhost:5454/api/variant/update/${variantId}`,
            variant
        );
    } catch (e) {
        console.log("Update variant API error: " + e);
    }
    return result;
};
export const createVariant = async ({variant, productId}) => {
    let result = null;
    try {
        result = await axios.post(
            `${VARIANT_MANAGEMENT_API}/variant/${productId}/create`,
            variant
        );
    } catch (e) {
        console.log("create variant API error: " + e);
    }
    return result;
};
export const deleteVariantAfterCreate = async ({variantId}) => {
    let result = null;
    try {
        result = await axios.delete(
            `${VARIANT_MANAGEMENT_API}/variant/delete/${variantId}`
        );
    } catch (e) {
        console.log("delete variant API error: " + e);
    }
    return result;
};
