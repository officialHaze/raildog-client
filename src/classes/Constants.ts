export default class Constants {
  public static REGISTER_BTN = "REGISTER_BTN";
  public static LOGIN_BTN = "LOGIN_BTN";
  public static MODAL = "MODAL";
  public static REFRESH_TOKEN = "refresh_token";
  public static ACCESS_TOKEN = "access_token";
}

export class ModalTypes extends Constants {
  public static REGISTER_MODAL = "REGISTER_MODAL";
  public static LOGIN_MODAL = "LOGIN_MODAL";
}

export class InputTypes {
  public static EMAIL_INPUT = "EMAIL_INPUT";
  public static USERNAME_INPUT = "USERNAME_INPUT";
  public static PHONE_INPUT = "PHONE_INPUT";
  public static PASSWORD_INPUT = "PASSWORD_INPUT";
  public static CONFIRM_PASSWORD_INPUT = "CONFIRM_PASSWORD_INPUT";
  public static INDIVIDUAL_ROLE = "INDIVIDUAL_ROLE";
  public static DEVELOPER_ROLE = "DEVELOPER_ROLE";
  public static BUSINESS_ROLE = "BUSINESS_ROLE";
}

export class PopupTypes {
  public static ERROR_POPUP = "ERROR_POPUP";
  public static SUCCESS_POPUP = "SUCCESS_POPUP";
}

export class ErrorTexts {
  public static INVALID_EMAIL: any = {
    A01: "A valid email address is required!",
  };

  public static INVALID_USERNAME: any = {
    A01: "A valid username is required!",
  };

  public static INVALID_PHONE: any = {
    A01: "A valid and unique phone number is required!",
  };

  public static INVALID_PASSWORD: any = {
    A01: "A strong and valid password is required!",
  };

  public static INVALID_CONFIRM_PASSWORD: any = {
    A01: "This field is mandatory!",
    PCP01: "Passwords don't match!",
  };

  public static INVALID_ROLE: any = {
    A01: "Please select a role!",
  };
}

export class SidePanelOptionsId {
  public static API_KEYS = "API_KEYS";
  public static RAILDOG_API = "RAILDOG_API";
  public static DOC = "DOC";

  // Sub options id
  public static RAILDOG_SUB_SNIFF_TRAINS = "RAILDOG_SUB_SNIFF_TRAINS";
  public static RAILDOG_SUB_SNIFF_LIVE_STATUS = "RAILDOG_SUB_SNIFF_LIVE_STATUS";
}
