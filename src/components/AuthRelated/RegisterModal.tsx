import { useContext, useState } from "react";
import { ModalContext } from "../../App";
import { ModalTypes } from "../../classes/Constants";
import { IoCloseCircle } from "react-icons/io5";
import RegisterForm from "./RegisterForm";
import RegistrationData from "../../interfaces/RegistrationData";
import { useRegistrationLabel } from "../../utils/customHooks";
import VerifyEmail from "./VerifyEmail";
import AuthModalImg from "./AuthModalImg";

export default function RegisterModal() {
  const toDisplayModal = useContext(ModalContext);
  const [registerData, setRegisterData] = useState<RegistrationData>({
    email: "",
    username: "",
    phone: 0,
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [label, setLabel, resetLabel] = useRegistrationLabel();
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const reset = () => {
    setRegisterData({
      email: "",
      username: "",
      phone: 0,
      password: "",
      confirmPassword: "",
      role: "",
    });
    resetLabel();
    setIsRegistrationComplete(false);
  };

  const close = () => {
    reset();
    // toDisplayModal can be null hence check and then assign
    toDisplayModal &&
      toDisplayModal({
        toDisplay: false,
        modalType: ModalTypes.REGISTER_MODAL,
        payload: null,
      });
  };

  return (
    <div className="relative flex gap-6 shadow-lg transition-all rounded-xl overflow-hidden w-full lg:w-[90%] h-full bg-github-black-primary text-white">
      <AuthModalImg />
      <div className="w-[100%] lg:w-[50%]">
        <div onClick={close} className="absolute right-2 top-1">
          <IoCloseCircle className="text-3xl cursor-pointer" />
        </div>

        <div className="heading text-center py-4">
          <h2>{!isRegistrationComplete ? "Create an account" : "Verify your email"}</h2>
        </div>

        {!isRegistrationComplete ? (
          <RegisterForm
            labelPos={label}
            setLabelPos={setLabel}
            registerData={registerData}
            setRegisterData={setRegisterData}
            isRegistrationComplete={setIsRegistrationComplete}
          />
        ) : (
          <VerifyEmail email={registerData.email} username={registerData.username} />
        )}
      </div>
    </div>
  );
}
