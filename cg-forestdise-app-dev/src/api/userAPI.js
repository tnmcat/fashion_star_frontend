import axios from "axios";
// const USER_MANAGEMENT_API = "https://forestdise.up.railway.app/api/users";
const USER_MANAGEMENT_API = "http://localhost:5454/api/users";

export const findUser = async (userId, token) => {
    let result = null;
    try {
        result = await axios.get(`${USER_MANAGEMENT_API}/${userId}`, {
            headers: {Authorization: "Bearer " + token},
        });
    } catch (e) {
        console.log("Find user API error: " + e);
    }
    return result;
};
