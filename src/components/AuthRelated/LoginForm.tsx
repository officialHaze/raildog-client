import { useContext, useState } from "react";
import Constants from "../../classes/Constants";
import UsernameInput from "../InputRelated/UsernameInput";
import PasswordInput from "../InputRelated/PasswordInput";
import SubmitBtn from "../InputRelated/SubmitBtn";
import Mappings from "../../classes/Mappings";
import { AuthContext, ModalContext, PopupContext } from "../../App";
import { useFocusIn, useFocusOut, useLoader } from "../../utils/customHooks";
import Loader from "../Loader/Loader";
import LoginData from "../../interfaces/LoginData";
import Handler from "../../classes/Handler";
import { CloseLoginModalCtx } from "./LoginModal";
import LabelData from "../../interfaces/LabelData";

interface Props {
  loginData: LoginData;
  setLoginData: React.Dispatch<React.SetStateAction<LoginData>>;
  labelPos: LabelData;
  setLabelPos: React.Dispatch<React.SetStateAction<LabelData>>;
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
  const setIsAuthenticated = useContext(AuthContext);
  const toDisplayModal = useContext(ModalContext);
  const closeLogin = useContext(CloseLoginModalCtx);

  useFocusIn({ labelPos, setLabelPos, indicator, setIndicator, labels: ["username", "password"] });
  useFocusOut({ labelPos, setLabelPos, labels: ["username", "password"], focusOutData: loginData });

  if (!setIsAuthenticated) throw new Error("AuthContext value is null");
  if (!toDisplayModal) throw new Error("Modal context value is null");
  if (!closeLogin) throw new Error("Close login modal context value is null");

  // Handle change in input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    id && Mappings.inputChangeMap[id](setLoginData, loginData, value);
  };

  const startLoginProcess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const handler = new Handler(startLoader, endLoader, setPopupDisplay, setIndicator);
    await handler.handleLogin(loginData, verifyEmail, setIsAuthenticated, closeLogin);
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
