import Cache from "../../classes/Cache";
import Constants from "../../classes/Constants";
import axiosInstance from "../axiosConfig";

export default async function replaceTokens() {
  try {
    // Get the stored refresh token
    const oldRefreshToken = Cache.getFromLocalStorage({ key: Constants.REFRESH_TOKEN });

    const { data } = await axiosInstance.post("/refresh_token", {
      refresh_token: oldRefreshToken,
    });
    console.log("Response after refreshing the tokens: ", data);
    // save the tokens
    Cache.saveInLocalStorage({
      key: Constants.REFRESH_TOKEN,
      value: data.refresh_token,
    });
    Cache.saveInCookie({
      cname: Constants.ACCESS_TOKEN,
      cvalue: data.access_token,
      expiryDays: 3,
    });
  } catch (err) {
    throw err;
  }
}
