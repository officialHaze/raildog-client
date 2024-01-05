import React from "react";
import { PopupTypes } from "./Constants";
import RegistrationData from "../interfaces/RegistrationData";
import Fetcher from "./Fetcher";
import Validator from "./Validator";
import Hasher from "./Hasher";
import axiosInstance from "../utils/axiosConfig";
import LoginData, { LoginDataToSubmit } from "../interfaces/LoginData";

export default class Handler {
  public startLoader: () => void;
  public endLoader: () => void;
  public setPopup: React.Dispatch<
    React.SetStateAction<{
      toDisplay: boolean;
      message: string;
      popupType: string;
    }>
  > | null;
  setIndicator: React.Dispatch<React.SetStateAction<any>> | null | undefined;

  constructor(
    startLoader: () => void,
    endLoader: () => void,
    setPopup: React.Dispatch<
      React.SetStateAction<{
        toDisplay: boolean;
        message: string;
        popupType: string;
      }>
    > | null,
    setIndicator?: React.Dispatch<React.SetStateAction<any>>
  ) {
    this.startLoader = startLoader;
    this.endLoader = endLoader;
    this.setPopup = setPopup;
    this.setIndicator = setIndicator;
  }

  public async handleRegistration(
    registerData: RegistrationData,
    isRegistrationComplete: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    Promise.resolve()
      .then(async () => {
        Validator.validateRegistrationData(registerData);

        console.log("REGISTRATION DATA: ", registerData);

        this.startLoader();

        const { email, phone, username, password, role } = registerData;

        // Hash the password
        const hash = Hasher.hashPass(password);
        console.log("Hashed pass: ", hash);

        const updatedData: RegistrationData = {
          email,
          phone,
          username,
          password: hash,
          role,
        };
        const res = await Fetcher.register(updatedData);
        console.log("Response after submitting registration data: ", res);

        this.endLoader();

        isRegistrationComplete(true);
      })
      .catch(err => {
        this.handleError(err, () => this.endLoader());
      });
  }

  public async handleLogin(
    loginData: LoginData,
    verifyEmail: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    Promise.resolve()
      .then(async () => {
        Validator.validateLoginData(loginData);

        console.log("LOGIN DATA: ", loginData);

        this.startLoader();

        const { username, password } = loginData;

        // Hash the password
        const hash = Hasher.hashPass(password);
        console.log("Hashed pass: ", hash);

        const updatedData: LoginDataToSubmit = {
          username_or_email: username,
          password: hash,
        };
        const res = await Fetcher.login(updatedData);
        console.log("Response after submitting registration data: ", res);

        this.endLoader();
      })
      .catch(err => {
        this.handleError(err, async (errStatus?: number) => {
          if (errStatus && errStatus === 403) {
            // Send verification email
            await this.handleResendVerifyEmail(loginData.username);
            // show verify email component
            verifyEmail(true);
          }
          this.endLoader();
        });
      });
  }

  public async handleResendVerifyEmail(username: string) {
    try {
      this.startLoader();

      const { data } = await axiosInstance.post("/send_verification_email", {
        username_or_email: username,
      });
      console.log("Response after calling resend verification email api: ", data);

      this.endLoader();

      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: "Verification link has been sent.",
          popupType: PopupTypes.SUCCESS_POPUP,
        });
    } catch (error) {
      this.handleError(error, () => this.endLoader());
    }
  }

  public handleError(err: any, callback: (errStatus?: number) => void) {
    console.log(err);

    if (err.errorCode) {
      const invalidFields: string[] = err.payload;
      invalidFields.forEach((field: string) => {
        this.setIndicator &&
          this.setIndicator((prevState: any) => {
            const newState = prevState;
            newState[field] = {
              toDisplay: true,
              errorCode: err.errorCode,
            };
            return { ...newState };
          });
      });
      callback();
    } else if (err.response) {
      const errstatus = err.response.status;

      const errmsg = err.response.data.Error;
      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: errmsg,
          popupType: PopupTypes.ERROR_POPUP,
        });

      if (errstatus === 401) {
        // Do other refresh token related stuff if required

        callback();
        return;
      }

      callback(errstatus);

      // switch (errstatus) {
      //   case 400:
      //     callback();
      //     break;

      //   case 403:

      //   case 401:
      //     callback();
      //     break;

      //   default:
      //     break;
      // }
    } else {
      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: "Something went wrong!",
          popupType: PopupTypes.ERROR_POPUP,
        });
      callback();
    }
  }
}
