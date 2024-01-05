import { useContext, useEffect, useState } from "react";
import Constants from "../../classes/Constants";
import UsernameInput from "../InputRelated/UsernameInput";
import PasswordInput from "../InputRelated/PasswordInput";
import SubmitBtn from "../InputRelated/SubmitBtn";
import Mappings from "../../classes/Mappings";
import { PopupContext } from "../../App";
import { useLoader } from "../../utils/customHooks";
import Loader from "../Loader/Loader";
import LoginData from "../../interfaces/LoginData";
import Handler from "../../classes/Handler";

interface Props {
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
  labelPos: LoginData;
  setLabelPos: React.Dispatch<React.SetStateAction<LoginData>>;
  verifyEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({
  loginData,
  setLoginData,
  labelPos,
  setLabelPos,
  verifyEmail,
}: Props) {
  const setPopupDisplay = useContext(PopupContext);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();
  const [indicator, setIndicator] = useState({
    username: {
      toDisplay: false,
      errorCode: "",
    },

    password: {
      toDisplay: false,
      errorCode: "",
    },
  });

  // Monitor and handle focus in any of the input fields
  useEffect(() => {
    const handleFocusin = (e: any) => {
      // Remove any preloaded error indicator
      setIndicator({
        username: {
          toDisplay: false,
          errorCode: "",
        },

        password: {
          toDisplay: false,
          errorCode: "",
        },
      });

      const id = e.target.id;
      // console.log("Focused in: ", id);
      id && id.includes("INPUT") && Mappings.focusInMap[id](labelPos, setLabelPos, indicator);
    };
    document.addEventListener("focusin", handleFocusin);
    return () => {
      document.removeEventListener("focusin", handleFocusin);
    };
  }, [labelPos, setLabelPos, indicator]);

  // Monitor and handle focus out in any of the input fields
  useEffect(() => {
    const handleFocusout = (e: any) => {
      const id = e.target.id;
      // console.log("Focused out: ", id);
      id && id.includes("INPUT") && Mappings.focusOutMap[id](labelPos, setLabelPos, loginData);
    };
    document.addEventListener("focusout", handleFocusout);
    return () => {
      document.removeEventListener("focusout", handleFocusout);
    };
  }, [labelPos, setLabelPos, loginData]);

  // Handle change in input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    id && Mappings.inputChangeMap[id](setLoginData, loginData, value);
  };

  const startLoginProcess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const handler = new Handler(startLoader, endLoader, setPopupDisplay, setIndicator);
    await handler.handleLogin(loginData, verifyEmail);
  };

  return (
    <form className="px-4 py-4 flex flex-col gap-6" onSubmit={startLoginProcess}>
      <UsernameInput
        onChange={handleChange}
        value={loginData.username}
        labelPos={labelPos}
        indicator={indicator.username}
        isLoginComponent={true}
      />
      <PasswordInput
        onChange={handleChange}
        value={loginData.password}
        labelPos={labelPos}
        indicator={indicator.password}
      />
      <div>
        <SubmitBtn
          isDisabled={isLoaderRunning}
          btnDisplayText={isLoaderRunning ? <Loader /> : "Login"}
        />

        <div className="text-center text-lg">
          Don't have an account?{" "}
          <span id={Constants.REGISTER_BTN} className="cursor-pointer text-raildog-blue">
            Register now
          </span>
        </div>
      </div>
    </form>
  );
}
