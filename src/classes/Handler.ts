import React from "react";
import { PopupTypes } from "./Constants";
import RegistrationData from "../interfaces/RegistrationData";
import Fetcher from "./Fetcher";
import Validator from "./Validator";
import Hasher from "./Hasher";

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

  constructor(
    startLoader: () => void,
    endLoader: () => void,
    setPopup: React.Dispatch<
      React.SetStateAction<{
        toDisplay: boolean;
        message: string;
        popupType: string;
      }>
    > | null
  ) {
    this.startLoader = startLoader;
    this.endLoader = endLoader;
    this.setPopup = setPopup;
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
        this.endLoader();
        this.handleError(err);
      });
  }

  public handleError(err: any) {
    console.log(err);

    if (err.errorCode) {
      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: err.message,
          popupType: PopupTypes.ERROR_POPUP,
        });
    } else if (err.response) {
      const errstatus = err.response.status;
      switch (errstatus) {
        case 400:
          const errmsg = err.response.data.Error;
          this.setPopup &&
            this.setPopup({
              toDisplay: true,
              message: errmsg,
              popupType: PopupTypes.ERROR_POPUP,
            });
          break;

        default:
          break;
      }
    } else
      this.setPopup &&
        this.setPopup({
          toDisplay: true,
          message: "Something went wrong!",
          popupType: PopupTypes.ERROR_POPUP,
        });
  }
}
