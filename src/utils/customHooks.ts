import { ReactNode, useEffect, useMemo, useState } from "react";
import LabelData from "../interfaces/LabelData";
import Mappings from "../classes/Mappings";
import LoginData from "../interfaces/LoginData";
import RegistrationData from "../interfaces/RegistrationData";

export const useRegistrationLabel = (): [
  label: LabelData,
  setLabel: React.Dispatch<React.SetStateAction<LabelData>>,
  reset: () => void
] => {
  const [labelPos, setLabelPos] = useState<LabelData>({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const reset = () => {
    setLabelPos({
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return [labelPos, setLabelPos, reset];
};

export const useLoginLabel = (): [
  label: LabelData,
  setLabel: React.Dispatch<React.SetStateAction<LabelData>>,
  reset: () => void
] => {
  const [labelPos, setLabelPos] = useState<LabelData>({
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

  const startDisableTimer = () => {
    setIsDisabled(true);
    setTimer(timerInSec);
  };

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

export const useFocusIn = ({
  labelPos,
  setLabelPos,
  indicator,
  setIndicator,
  labels,
}: {
  labelPos: LabelData;
  setLabelPos: React.Dispatch<React.SetStateAction<LabelData>>;
  indicator: any;
  setIndicator: React.Dispatch<React.SetStateAction<any>>;
  labels: string[];
}) => {
  // Monitor and handle focus in any of the input fields
  useEffect(() => {
    const handleFocusin = (e: any) => {
      // Remove any preloaded error indicator
      setIndicator((prevState: any) => {
        const state = prevState;
        labels.forEach(label => (state[label] = { toDisplay: false, errorCode: "" }));
        return { ...state };
      });
      const id = e.target.id;
      // console.log("Focused in: ", id);
      id && id.includes("INPUT") && Mappings.focusInMap[id](labelPos, setLabelPos, indicator);
    };
    document.addEventListener("focusin", handleFocusin);
    return () => {
      document.removeEventListener("focusin", handleFocusin);
    };
  }, [labelPos, setLabelPos, indicator, labels, setIndicator]);
};

export const useFocusOut = ({
  labelPos,
  setLabelPos,
  labels,
  focusOutData,
}: {
  labelPos: LabelData;
  setLabelPos: React.Dispatch<React.SetStateAction<LabelData>>;
  labels: string[];
  focusOutData: LoginData | RegistrationData;
}) => {
  // Monitor and handle focus in any of the input fields
  useEffect(() => {
    const handleFocusout = (e: any) => {
      const id = e.target.id;
      // console.log("Focused in: ", id);
      id && id.includes("INPUT") && Mappings.focusOutMap[id](labelPos, setLabelPos, focusOutData);
    };
    document.addEventListener("focusout", handleFocusout);
    return () => {
      document.removeEventListener("focusout", handleFocusout);
    };
  }, [labelPos, setLabelPos, labels, focusOutData]);
};

export const useHoverInfoBox = () => {
  const [displayHoverInfoBox, toDisplayHoverInfoBox] = useState(false);
  const [hoverInfoBody, setHoverInfoBody] = useState<ReactNode | string>("");

  const setHoverInfoStatus = ({
    toDisplayHoverInfo,
    infoBody,
  }: {
    toDisplayHoverInfo: boolean;
    infoBody: string | ReactNode;
  }) => {
    toDisplayHoverInfoBox(toDisplayHoverInfo);
    setHoverInfoBody(infoBody);
  };

  return { displayHoverInfoBox, hoverInfoBody, setHoverInfoStatus };
};
