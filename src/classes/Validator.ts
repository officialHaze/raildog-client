// import RegistrationData from "../interfaces/RegistrationData";
import GetLiveStatusReqBody from "../interfaces/states/GetLiveStatusReqBody";
import GetTrainsReqBody from "../interfaces/states/GetTrainsReqBody";
import errCodeMap from "../json/errorCodeMappings.json";
import Constants from "./Constants";

export default class Validator {
  public static validateRegistrationData(data: any) {
    const fieldsToValidate = ["email", "phone", "username", "password", "confirmPassword", "role"];
    const invalidFields: string[] = [];

    fieldsToValidate.forEach(field => {
      const value = data[field];
      if (!value) invalidFields.push(field);
    });
    if (invalidFields.length > 0)
      throw {
        errorCode: errCodeMap.fieldsInvalid,
        payload: invalidFields,
      };

    // Confirm password
    const match = data.password === data.confirmPassword;
    if (!match) {
      invalidFields.push("confirmPassword");
      throw { errorCode: errCodeMap.passwordsDontMatch, payload: invalidFields };
    }
    return;
  }

  public static validateLoginData(data: any) {
    const fieldsToValidate = ["username", "password"];
    const invalidFields: string[] = [];

    fieldsToValidate.forEach(field => {
      const value = data[field];
      if (!value) invalidFields.push(field);
    });
    if (invalidFields.length > 0)
      throw {
        errorCode: errCodeMap.fieldsInvalid,
        payload: invalidFields,
      };

    return;
  }

  public static validateGetTrainsReqBodyData(data: GetTrainsReqBody, apikey: string) {
    const { startStation, stopStation } = data;
    const invalidFields: string[] = [];

    if (!startStation) invalidFields.push(Constants.START_STATION);
    if (!stopStation) invalidFields.push(Constants.STOP_STATION);
    if (!apikey) invalidFields.push(Constants.API_KEY);

    if (invalidFields.length > 0)
      throw { errorCode: errCodeMap.fieldsInvalid, payload: invalidFields };

    return;
  }

  public static validateLiveStatusReqBody(data: GetLiveStatusReqBody, apikey: string) {
    const { train_name, train_no, at_stn, date } = data;
    const invalidFields: string[] = [];

    if (!train_name) invalidFields.push(Constants.TRAIN_NAME);
    if (!train_no) invalidFields.push(Constants.TRAIN_NO);
    if (!at_stn) invalidFields.push(Constants.AT_STN);
    if (!date) invalidFields.push(Constants.DATE);
    if (!apikey) invalidFields.push(Constants.API_KEY);

    if (invalidFields.length > 0)
      throw { errorCode: errCodeMap.fieldsInvalid, payload: invalidFields };

    return;
  }
}
