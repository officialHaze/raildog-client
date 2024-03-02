import { useContext, useState } from "react";
import { ModalContext, PopupContext } from "../../App";
import { InputTypes, ModalTypes, PopupTypes } from "../../classes/Constants";
import { IoCloseCircle } from "react-icons/io5";
import {
  useFocusIn,
  useFocusOut,
  useLoader,
  useLoginLabel,
  useRegistrationLabel,
} from "../../utils/customHooks";
import AuthModalImg from "./AuthModalImg";
import LoginData from "../../interfaces/LoginData";
import LoginForm from "./LoginForm";
import VerifyEmail from "./VerifyEmail";
import { createContext } from "react";
import { PasswordResetData } from "../../interfaces/PasswordResetData";
import EmailInput from "../InputRelated/EmailInput";
import Mappings from "../../classes/Mappings";
import Handler from "../../classes/Handler";
import Loader from "../Loader/Loader";
import UsernameInput from "../InputRelated/UsernameInput";
import PasswordInput from "../InputRelated/PasswordInput";

export default function ResetPasswordModal() {
  const toDisplayModal = useContext(ModalContext);
  const [passwordResetData, setPasswordResetData] = useState<PasswordResetData>({
    username: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });
  const [label, setLabel, resetLabel] = useRegistrationLabel();
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);

  const [indicator, setIndicator] = useState({
    email: {
      toDisplay: false,
      errorCode: "",
    },

    password: {
      toDisplay: false,
      errorCode: "",
    },

    confirmPassword: {
      toDisplay: false,
      errorCode: "",
    },
  });

  useFocusIn({
    labelPos: label,
    setLabelPos: setLabel,
    indicator,
    setIndicator,
    labels: ["username", "password", "confirmPassword"],
  });
  useFocusOut({
    labelPos: label,
    setLabelPos: setLabel,
    labels: ["username", "password", "confirmPassword"],
    focusOutData: passwordResetData,
  });

  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();

  const setPopupDisplay = useContext(PopupContext);
  if (!setPopupDisplay) throw new Error("Set pop up display context is null!");

  const reset = () => {
    setPasswordResetData({
      username: "",
      verificationCode: "",
      password: "",
      confirmPassword: "",
    });
    resetLabel();
    setIsVerificationCodeSent(false);
  };

  const close = () => {
    reset();
    // toDisplayModal can be null hence check and then assign
    toDisplayModal &&
      toDisplayModal({
        toDisplay: false,
        modalType: ModalTypes.RESET_PASS_MODAL,
        payload: null,
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    if (id === "verification-code") {
      return setPasswordResetData({
        ...passwordResetData,
        verificationCode: value,
      });
    }

    id && Mappings.inputChangeMap[id](setPasswordResetData, passwordResetData, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const handler = new Handler(startLoader, endLoader, setPopupDisplay);

    // Check if before verification code sent or after verification
    // code sent
    if (!isVerificationCodeSent) {
      // Call the send verification code API
      handler.handleSendingVerificationCode(passwordResetData.username, setIsVerificationCodeSent);
    } else {
      // Call the reset password API
      handler.handleResettingThePassword(passwordResetData, close);
    }
  };

  return (
    <div className="relative flex gap-6 shadow-lg transition-all rounded-xl overflow-hidden w-full lg:w-[90%] h-full bg-github-black-primary text-white">
      <AuthModalImg />
      <div className="w-[100%] lg:w-[50%]">
        <div onClick={close} className="absolute right-2 top-1">
          <IoCloseCircle className="text-3xl cursor-pointer" />
        </div>

        <div className="heading text-center py-4">
          <h2>Reset Password</h2>
        </div>

        <form className="p-4 flex flex-col gap-6" onSubmit={handleSubmit}>
          {!isVerificationCodeSent ? (
            <>
              <UsernameInput
                labelPos={label}
                onChange={handleChange}
                value={passwordResetData.username}
                indicator={indicator.email}
                isLoginComponent={true}
              />
              {passwordResetData.username && (
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 w-[20%]"
                  >
                    {isLoaderRunning ? <Loader /> : "Continue"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <input
                  id="verification-code"
                  value={passwordResetData.verificationCode}
                  placeholder="Verification Code*"
                  onChange={handleChange}
                />
              </div>

              <PasswordInput
                labelPos={label}
                onChange={handleChange}
                value={passwordResetData.password}
                indicator={indicator.password}
                inputName="New Password*"
              />

              <PasswordInput
                labelPos={label}
                onChange={handleChange}
                value={passwordResetData.confirmPassword}
                indicator={indicator.confirmPassword}
                inputName="Confirm Password*"
                id={InputTypes.CONFIRM_PASSWORD_INPUT}
              />

              {passwordResetData.username &&
                passwordResetData.verificationCode &&
                passwordResetData.password && (
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 w-[30%]"
                    >
                      {isLoaderRunning ? <Loader /> : "Reset Password"}
                    </button>
                  </div>
                )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}
