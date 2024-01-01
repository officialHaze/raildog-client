import React from "react";
import { PopupTypes } from "./Constants";

export default class Handler {
  public static handleError(
    err: any,
    setPopup: React.Dispatch<
      React.SetStateAction<{
        toDisplay: boolean;
        message: string;
        popupType: string;
      }>
    > | null
  ) {
    if (err.errorCode) {
      setPopup &&
        setPopup({
          toDisplay: true,
          message: err.message,
          popupType: PopupTypes.ERROR_POPUP,
        });
    }
  }
}
