import axios from "axios";

// const REVIEW_MANAGEMENT_API = "https://forestdise.up.railway.app/api/reviews";
const REVIEW_MANAGEMENT_API = "http://localhost:5454/api/reviews";

export const findReview = async (variantId) => {
    let result = null;
    try {
        result = await axios.get(`${REVIEW_MANAGEMENT_API}/${variantId}`);
    } catch (e) {
        console.log("Find books API error: " + e);
    }
    return result;
};

export const findReviewByProductId = async (productId) => {
    let result = null;
    try {
        result = await axios.get(
            `${REVIEW_MANAGEMENT_API}/product/${productId}`
        );
    } catch (e) {
        console.log("Find review API error: " + e);
    }
    return result;
};

export const createReview = async ({review, variantId, userId}) => {
    console.log(review);
    console.log(variantId);
    let result = null;

    try {
        result = await axios.post(
            `${REVIEW_MANAGEMENT_API}/${userId}/${variantId}`,
            review
        );
    } catch (e) {
        console.log("create book API error: " + e);
    }
    return result;
};
