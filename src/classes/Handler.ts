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
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    Promise.resolve()
      .then(async () => {
        this.startLoader();
        const { data } = await axiosInstance.get("/auth/generate_api_key");
        this.endLoader();
        console.log(data);
      })
      .catch(err => {
        this.handleError(err, async (errStatus?: number) => {
          this.endLoader();
          if (errStatus && errStatus === 401) {
            try {
              await replaceTokens();
              // Call the method again
              this.handleAPIKeyGeneration(setIsAuthenticated);
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
  }: {
    api_key_ids: string[];
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    try {
      this.startLoader();
      const { data } = await axiosInstance.delete("/auth/delete_api_keys", {
        data: {
          api_key_ids,
        },
      });
      console.log("Response after deleting API key: ", data);
      this.endLoader();

      // refresh the window
      window.location.reload();
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
            });
          } catch (err) {
            console.error(err);
            logout({ setIsAuthenticated });
          }
        }
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

      const errmsg = err.response.data.Error;

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
