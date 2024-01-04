import { useMemo, useState } from "react";
import RegistrationData from "../interfaces/RegistrationData";
import LoginData from "../interfaces/LoginData";

export const useRegistrationLabel = (): [
  label: RegistrationData,
  setLabel: React.Dispatch<React.SetStateAction<RegistrationData>>,
  reset: () => void
] => {
  const [labelPos, setLabelPos] = useState<RegistrationData>({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const reset = () => {
    setLabelPos({
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  return [labelPos, setLabelPos, reset];
};

export const useLoginLabel = (): [
  label: LoginData,
  setLabel: React.Dispatch<React.SetStateAction<LoginData>>,
  reset: () => void
] => {
  const [labelPos, setLabelPos] = useState<LoginData>({
    username: "",
    password: "",
  });

  const reset = () => {
    setLabelPos({
      username: "",
      password: "",
    });
  };

  return [labelPos, setLabelPos, reset];
};

export const usePopup = (): [
  displayPopup: { toDisplay: boolean; message: string; popupType: string },
  setPopupDisplay: React.Dispatch<
    React.SetStateAction<{
      toDisplay: boolean;
      message: string;
      popupType: string;
    }>
  >
] => {
  const [displayPopup, setPopupDisplay] = useState({
    toDisplay: false,
    message: "",
    popupType: "",
  });

  useMemo(() => {
    if (displayPopup.toDisplay) {
      setTimeout(() => {
        setPopupDisplay({
          toDisplay: false,
          message: "",
          popupType: "",
        });
      }, 5000);
    }

    // return () => {
    //   setPopupDisplay({
    //     toDisplay: false,
    //     message: "",
    //     popupType: "",
    //   });
    // };
  }, [displayPopup.toDisplay]);

  return [displayPopup, setPopupDisplay];
};

export const useLoader = (): {
  startLoader: () => void;
  endLoader: () => void;
  isRunning: boolean;
} => {
  const [startLoader, toStartLoader] = useState(false);

  const start = () => {
    toStartLoader(true);
  };

  const end = () => {
    toStartLoader(false);
  };

  return { startLoader: start, endLoader: end, isRunning: startLoader };
};

export const useDisableTimer = (
  timerInSec: number
): { isDisabled: boolean; timer: number; startDisableTimer: () => void } => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(timerInSec);

  const startDisableTimer = () => setTimer(timerInSec);

  useMemo(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer <= 0) {
      setIsDisabled(false);
    }
    // return () => {
    //   setTimer(0);
    // };
  }, [timer]);

  return { isDisabled, timer, startDisableTimer };
};
