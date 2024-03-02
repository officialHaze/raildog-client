import React from "react";
import { PopupTypes } from "./Constants";
import RegistrationData from "../interfaces/RegistrationData";
import Fetcher from "./Fetcher";
import Validator from "./Validator";
import Hasher from "./Hasher";
import axiosInstance from "../utils/axiosConfig";
import LoginData, { LoginDataToSubmit } from "../interfaces/LoginData";
import login from "../utils/AuthRelated/login";
import logout from "../utils/AuthRelated/logout";
import replaceTokens from "../utils/AuthRelated/replaceTokens";
import { APIKeyObj } from "../interfaces/states/APIKeysQueryData";
import GetTrainsReqBody from "../interfaces/states/GetTrainsReqBody";
import GetLiveStatusReqBody from "../interfaces/states/GetLiveStatusReqBody";
import BypassCaptchaReqBody from "../interfaces/states/BypassCaptchaReqBody";
import isObjectEmpty from "../utils/isObjectEmpty";
import { PasswordResetData } from "../interfaces/PasswordResetData";

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
    verifyEmail: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    closeLoginModal: () => void
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
        const res: { access_token: string; refresh_token: string } = await Fetcher.login(
          updatedData
        );
        console.log("Response after submitting registration data: ", res);

        this.endLoader();

        closeLoginModal();
        login({
          setIsAuthenticated,
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
        });
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

  public async handleAPIKeyGeneration(
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setNewAPIKey: React.Dispatch<React.SetStateAction<APIKeyObj[] | null | undefined>>
  ) {
    Promise.resolve()
      .then(async () => {
        this.startLoader();
        const { data } = await axiosInstance.get("/auth/generate_api_key");
        this.endLoader();
        console.log(data);

        // Update the new api key in the list
        setNewAPIKey(prevState => {
          if (prevState) return [...prevState, data];
        });
      })
      .catch(err => {
        this.handleError(err, async (errStatus?: number) => {
          this.endLoader();
          if (errStatus && errStatus === 401) {
            try {
              await replaceTokens();
              // Call the method again
              this.handleAPIKeyGeneration(setIsAuthenticated, setNewAPIKey);
            } catch (err) {
              console.error(err);
              logout({ setIsAuthenticated });
            }
          }
        });
      });
  }

  public async handleAPIKeyUpdate({
    update_type,
    api_key_ids,
    setIsAuthenticated,
    setIsEnabled,
  }: {
    update_type: string;
    api_key_ids: string[];
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    try {
      this.startLoader();
      const { data } = await axiosInstance.put("/auth/update_api_keys", {
        update_type,
        api_key_ids,
      });
      console.log("Response after updating API key: ", data);
      this.endLoader();

      // Toggle enable / disable
      setIsEnabled(update_type === "enable" ? true : false);
    } catch (err) {
      this.handleError(err, async (errStatus?: number) => {
        this.endLoader();
        if (errStatus && errStatus === 401) {
          try {
            await replaceTokens();
            // Call the method again
            this.handleAPIKeyUpdate({
              update_type,
              api_key_ids,
              setIsAuthenticated,
              setIsEnabled,
            });
          } catch (err) {
            console.error(err);
            logout({ setIsAuthenticated });
          }
        }
      });
    }
  }

  // Handle API key delete
  public async handleAPIKeyDelete({
    api_key_ids,
    setIsAuthenticated,
    apiKeysObj,
    setAPIKeyObj,
  }: {
    api_key_ids: { id: string; idxPos: number }[];
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    apiKeysObj: APIKeyObj[];
    setAPIKeyObj: React.Dispatch<React.SetStateAction<APIKeyObj[] | null | undefined>>;
  }) {
    try {
      this.startLoader();
      const ids = api_key_ids.map(obj => obj.id);
      const { data } = await axiosInstance.delete("/auth/delete_api_keys", {
        data: {
          api_key_ids: ids,
        },
      });
      console.log("Response after deleting API key: ", data);
      this.endLoader();

      // Remove the api key obj for each api key id obj
      const apiKeysObjArr = apiKeysObj;
      for (const idObj of api_key_ids) {
        const idx = idObj.idxPos;
        apiKeysObjArr.splice(idx, 1);
      }
      // Update the list
      setAPIKeyObj([...apiKeysObjArr]);
    } catch (err) {
      this.handleError(err, async (errStatus?: number) => {
        this.endLoader();
        if (errStatus && errStatus === 401) {
          try {
            await replaceTokens();
            // Call the method again
            this.handleAPIKeyDelete({
              api_key_ids,
              setIsAuthenticated,
              apiKeysObj,
              setAPIKeyObj,
            });
          } catch (err) {
            console.error(err);
            logout({ setIsAuthenticated });
          }
        }
      });
    }
  }

  public async handleGettingTrainList(data_: GetTrainsReqBody, apikey: string) {
    try {
      this.startLoader();
      const res = await axiosInstance.post(`/api/get_trains?key=${apikey}`, data_);
      console.log(`Response for getting trains: `, res);
      this.endLoader();

      return res;
    } catch (err: any) {
      this.handleError(err, (errstatus?: number) => {
        this.endLoader();
        throw err;
      });
    }
  }

  // Handle getting live status
  public async handleGettingLiveStatus(data_: GetLiveStatusReqBody, apikey: string) {
    try {
      this.startLoader();
      const res = await axiosInstance.post(`/api/get_live_status?key=${apikey}`, data_);
      console.log(`Live status response: `, res);
      this.endLoader();

      return res;
    } catch (err: any) {
      this.handleError(err, (errstatus?: number) => {
        this.endLoader();
        throw err;
      });
    }
  }

  // Handle calling the bypass captcha api
  public async handleCaptchaBypassing(data_: BypassCaptchaReqBody, apikey: string) {
    try {
      this.startLoader();
      const res = await axiosInstance.post(`/api/bypass_captcha?key=${apikey}`, data_);
      console.log("Bypass captcha response: ", res);
      this.endLoader();
      return res;
    } catch (err: any) {
      this.handleError(err, (errstatus?: number) => {
        this.endLoader();
        throw err;
      });
    }
  }

  // Handle sending the verification code
  public async handleSendingVerificationCode(
    email: string,
    setIsVerificationCodeSent: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    try {
      this.startLoader();
      const { data } = await axiosInstance.post("/send_verification_code", {
        username_or_email: email,
      });
      this.endLoader();

      console.log("Verification Code response: ", data);

      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: "Verification code sent to the registered email id.",
          popupType: PopupTypes.SUCCESS_POPUP,
        });

      setIsVerificationCodeSent(true);
    } catch (err: any) {
      this.handleError(err, (errStatus?: number) => {
        this.endLoader();
      });
    }
  }

  // Handle resetting the password
  public async handleResettingThePassword(
    passwordResetData: PasswordResetData,
    closeModal: () => void
  ) {
    try {
      if (!this.setPopup) return;

      console.log(passwordResetData);

      // Validate all the data before calling the API
      if (!passwordResetData.verificationCode)
        return this.setPopup({
          toDisplay: true,
          message: "Please enter the verification code sent to your registered email id!",
          popupType: PopupTypes.ERROR_POPUP,
        });
      if (!passwordResetData.password)
        return this.setPopup({
          toDisplay: true,
          message: "Please enter a new password to continue!",
          popupType: PopupTypes.ERROR_POPUP,
        });
      if (!passwordResetData.confirmPassword)
        return this.setPopup({
          toDisplay: true,
          message: "Please confirm your password before continuing!",
          popupType: PopupTypes.ERROR_POPUP,
        });

      // Match and confirm the password
      if (passwordResetData.password !== passwordResetData.confirmPassword)
        return this.setPopup({
          toDisplay: true,
          message: "Passwords don't match!",
          popupType: PopupTypes.ERROR_POPUP,
        });

      // Hash the new password
      const hash = Hasher.hashPass(passwordResetData.password);
      console.log("Hashed pass: ", hash);

      this.startLoader();
      const { data } = await axiosInstance.post("/reset_password", {
        verification_code: passwordResetData.verificationCode,
        username_or_email: passwordResetData.username,
        new_password: hash,
      });
      this.endLoader();

      console.log("Response after password reset: ", data);

      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: "Password has been successfully reset!",
          popupType: PopupTypes.SUCCESS_POPUP,
        });

      closeModal();
    } catch (err: any) {
      this.handleError(err, (errStatus?: number) => {
        this.endLoader();
      });
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

      let errmsg = err.response.data.Error?.message || err.response.data.Error;
      if (!errmsg || isObjectEmpty(errmsg)) errmsg = "Unexpected Error!";

      if (errstatus === 401) {
        return callback(errstatus);
      }

      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: errmsg,
          popupType: PopupTypes.ERROR_POPUP,
        });

      callback(errstatus);
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
