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
}
