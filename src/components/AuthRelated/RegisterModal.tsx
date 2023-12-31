import { useContext, useRef, useState } from "react";
import { ModalContext } from "../../App";
import { ModalTypes } from "../../classes/Constants";
import { IoCloseCircle } from "react-icons/io5";
import RegisterForm from "./RegisterForm";
import RegistrationData from "../../interfaces/RegistrationData";

export default function RegisterModal() {
  const toDisplayModal = useContext(ModalContext);
  const [registerData, setRegisterData] = useState<RegistrationData>({
    email: "",
    username: "",
    phone: 0,
    password: "",
    confirmPassword: "",
  });
  const [labelPos, setLabelPos] = useState<RegistrationData>({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setRegisterData({
      email: "",
      username: "",
      phone: 0,
      password: "",
      confirmPassword: "",
    });

    setLabelPos({
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
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
    <div className="relative transition-all rounded-xl overflow-hidden w-full h-full bg-[#191919] text-white">
      <div onClick={close} className="absolute right-2 top-1">
        <IoCloseCircle className="text-3xl cursor-pointer" />
      </div>

      <div className="heading text-center py-4">
        <h2>Create an account</h2>
      </div>

      <RegisterForm
        labelPos={labelPos}
        setLabelPos={setLabelPos}
        registerData={registerData}
        setRegisterData={setRegisterData}
        emailInputRef={emailInputRef}
        usernameInputRef={usernameInputRef}
        phoneInputRef={phoneInputRef}
        passwordInputRef={passwordInputRef}
        confirmPassInputRef={confirmPasswordInputRef}
      />
    </div>
  );
}
