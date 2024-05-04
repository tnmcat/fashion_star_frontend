import axios from "axios";

// const HASHTAG_MANAGEMENT_API = "https://forestdise.up.railway.app/api/hashtag";
const HASHTAG_MANAGEMENT_API = "http://localhost:5454/api/hashtag";

export const createHashtag = async (hashtag) => {
    let result = null;
    try {
        result = await axios.post(`${HASHTAG_MANAGEMENT_API}`, hashtag);
    } catch (e) {
        console.log("create book API error: " + e);
    }
    return result;
};
