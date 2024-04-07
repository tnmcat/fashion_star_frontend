import axios from "axios";

// const BULLET_MANAGEMENT_API = "https://forestdise.up.railway.app/api/bullet";
const BULLET_MANAGEMENT_API = "http://localhost:5454/api/bullet";

export const createBullet = async (bullet) => {
    let result = null;
    try {
        result = await axios.post(`${BULLET_MANAGEMENT_API}`, bullet);
    } catch (e) {
        console.log("create book API error: " + e);
    }
    return result;
};
