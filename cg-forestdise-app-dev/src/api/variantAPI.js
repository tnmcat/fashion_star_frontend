import axios from "axios";
// const VARIANT_MANAGEMENT_API = "https://forestdise.up.railway.app/api";
const VARIANT_MANAGEMENT_API = "http://localhost:5454/api";

export const findVariant = async (productId) => {
    let result = null;
    try {
        result = await axios.get(
            `http://localhost:5454/api/product-detail/${productId}`
        );
    } catch (e) {
        console.log("Find variant API error: " + e);
    }
    return result;
};

export const findVariantById = async (productId) => {
    let result = null;
    try {
        result = await axios.get(
            `http://localhost:5454/api/variant/${productId}`
        );
    } catch (e) {
        console.log("Find variant API error: " + e);
    }
    return result;
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
