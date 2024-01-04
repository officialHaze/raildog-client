import { useContext, useEffect } from "react";
import Constants, { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";
import EmailInput from "../InputRelated/EmailInput";
import UsernameInput from "../InputRelated/UsernameInput";
import PhoneInput from "../InputRelated/PhoneInput";
import PasswordInput from "../InputRelated/PasswordInput";
import RoleSelector from "../InputRelated/RoleSelector";
import SubmitBtn from "../InputRelated/SubmitBtn";
import Mappings from "../../classes/Mappings";
import Handler from "../../classes/Handler";
import { PopupContext } from "../../App";
import { useLoader } from "../../utils/customHooks";
import Loader from "../Loader/Loader";

interface Props {
  registerData: RegistrationData;
  setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  labelPos: RegistrationData;
  setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>;
  isRegistrationComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm({
  registerData,
  setRegisterData,
  labelPos,
  setLabelPos,
  isRegistrationComplete,
}: Props) {
  const setPopupDisplay = useContext(PopupContext);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();

  // Monitor and handle focus in any of the input fields
  useEffect(() => {
    const handleFocusin = (e: any) => {
      const id = e.target.id;
      // console.log("Focused in: ", id);
      id && id.includes("INPUT") && Mappings.focusInMap[id](labelPos, setLabelPos);
    };
    document.addEventListener("focusin", handleFocusin);
    return () => {
      document.removeEventListener("focusin", handleFocusin);
    };
  }, [labelPos, setLabelPos]);

  // Monitor and handle focus out in any of the input fields
  useEffect(() => {
    const handleFocusout = (e: any) => {
      const id = e.target.id;
      // console.log("Focused out: ", id);
      id && id.includes("INPUT") && Mappings.focusOutMap[id](labelPos, setLabelPos, registerData);
    };
    document.addEventListener("focusout", handleFocusout);
    return () => {
      document.removeEventListener("focusout", handleFocusout);
    };
  }, [labelPos, setLabelPos, registerData]);

  // Handle change in input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    id && Mappings.inputChangeMap[id](setRegisterData, registerData, value);
  };

  const startRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const handler = new Handler(startLoader, endLoader, setPopupDisplay);
    await handler.handleRegistration(registerData, isRegistrationComplete);
  };

  return (
    <form className="px-4 py-4 flex flex-col gap-6" onSubmit={startRegistration}>
      <EmailInput onChange={handleChange} value={registerData.email} labelPos={labelPos} />
      <UsernameInput onChange={handleChange} value={registerData.username} labelPos={labelPos} />
      <PhoneInput onChange={handleChange} value={registerData.phone} labelPos={labelPos} />
      <PasswordInput onChange={handleChange} value={registerData.password} labelPos={labelPos} />
      <PasswordInput
        onChange={handleChange}
        value={registerData.confirmPassword ?? ""}
        labelPos={labelPos}
        inputName="Confirm Password*"
        id={InputTypes.CONFIRM_PASSWORD_INPUT}
      />
      <RoleSelector value={registerData.role} onChange={handleChange} />
      <SubmitBtn
        isDisabled={isLoaderRunning}
        btnDisplayText={isLoaderRunning ? <Loader /> : "Register"}
      />

      <div className="text-center text-lg">
        Already have an account?{" "}
        <span id={Constants.LOGIN_BTN} className="cursor-pointer text-raildog-blue">
          Login
        </span>
      </div>
    </form>
  );
}
