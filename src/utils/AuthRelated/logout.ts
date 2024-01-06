import Cache from "../../classes/Cache";
import Constants from "../../classes/Constants";

export interface LogoutArgs {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function logout({ setIsAuthenticated }: LogoutArgs) {
  // Delete the tokens
  // Delete the refresh token
  Cache.deleteFromLocalStorage({ key: Constants.REFRESH_TOKEN });

  // Delete the access token
  Cache.deleteCookie({ cname: Constants.ACCESS_TOKEN });

  // Unauthenticate the user
  setIsAuthenticated(false);
}
