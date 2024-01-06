import Cache from "../../classes/Cache";
import Constants from "../../classes/Constants";
import { LogoutArgs } from "./logout";

interface LoginArgs extends LogoutArgs {
  accessToken: string;
  refreshToken: string;
}

export default function login({ setIsAuthenticated, accessToken, refreshToken }: LoginArgs) {
  // Save the tokens - access_token in cookie and refresh_token in local storage
  // Save the refresh token first
  Cache.saveInLocalStorage({ key: Constants.REFRESH_TOKEN, value: refreshToken });

  // Save the access token after
  Cache.saveInCookie({ cname: Constants.ACCESS_TOKEN, cvalue: accessToken, expiryDays: 3 });

  console.log("Tokens saved!");

  setIsAuthenticated(true);
}
