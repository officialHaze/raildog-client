import { LoginDataToSubmit } from "../interfaces/LoginData";
import RegistrationData from "../interfaces/RegistrationData";
import axiosInstance from "../utils/axiosConfig";

export default class Fetcher {
  public static async register(registrationData: RegistrationData) {
    try {
      const { data } = await axiosInstance.post("/register", registrationData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async login(loginData: LoginDataToSubmit) {
    try {
      const { data } = await axiosInstance.post("/login", loginData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async getApiKeys() {
    try {
      const { data } = await axiosInstance.get("/auth/get_api_keys");
      return data;
    } catch (error) {
      throw error;
    }
  }
}
