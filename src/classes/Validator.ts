import RegistrationData from "../interfaces/RegistrationData";
import errCodeMap from "../json/errorCodeMappings.json";

export default class Validator {
  public static validateRegistrationData(data: RegistrationData) {
    if (
      !data.email ||
      !data.phone ||
      !data.username ||
      !data.password ||
      !data.confirmPassword ||
      !data.role
    )
      throw {
        errorCode: errCodeMap.allFieldsInvalid,
        message: "All fields are mandatory and must be provided with a value!",
      };

    // Confirm password
    const match = data.password === data.confirmPassword;
    if (!match)
      throw { errorCode: errCodeMap.passwordsDontMatch, message: "Passwords don't match!" };

    return;
  }
}
