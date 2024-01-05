import { useContext, useState } from "react";
import { ModalContext } from "../../App";
import { ModalTypes } from "../../classes/Constants";
import { IoCloseCircle } from "react-icons/io5";
import { useLoginLabel } from "../../utils/customHooks";
import AuthModalImg from "./AuthModalImg";
import LoginData from "../../interfaces/LoginData";
import LoginForm from "./LoginForm";
import VerifyEmail from "./VerifyEmail";

export default function LoginModal() {
  const toDisplayModal = useContext(ModalContext);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [label, setLabel, resetLabel] = useLoginLabel();
  const [isLoginSuccessful, setIsLoginSuccesful] = useState(false);
  const [toVerifyEmail, verifyEmail] = useState(false);

  const reset = () => {
    setLoginData({
      username: "",
      password: "",
    });
    resetLabel();
    setIsLoginSuccesful(false);
    verifyEmail(false);
  };

  const close = () => {
    reset();
    // toDisplayModal can be null hence check and then assign
    toDisplayModal &&
      toDisplayModal({
        toDisplay: false,
        modalType: ModalTypes.LOGIN_MODAL,
        payload: null,
      });
  };

  return (
    <div className="relative flex gap-6 shadow-lg transition-all rounded-xl overflow-hidden w-full lg:w-[90%] h-full bg-[#191919] text-white">
      <AuthModalImg />
      <div className="w-[100%] lg:w-[50%]">
        <div onClick={close} className="absolute right-2 top-1">
          <IoCloseCircle className="text-3xl cursor-pointer" />
        </div>

        <div className="heading text-center py-4">
          <h2>{!toVerifyEmail ? "Login" : "Verify Email"}</h2>
        </div>

        {!toVerifyEmail ? (
          <LoginForm
            loginData={loginData}
            setLoginData={setLoginData}
            verifyEmail={verifyEmail}
            labelPos={label}
            setLabelPos={setLabel}
          />
        ) : (
          <VerifyEmail username={loginData.username} />
        )}
      </div>
    </div>
  );
}
