import { useContext, useState } from "react";
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
import { useFocusIn, useFocusOut, useLoader } from "../../utils/customHooks";
import Loader from "../Loader/Loader";
import LabelData from "../../interfaces/LabelData";

interface Props {
  registerData: RegistrationData;
  setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  labelPos: LabelData;
  setLabelPos: React.Dispatch<React.SetStateAction<LabelData>>;
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
  const [indicator, setIndicator] = useState({
    email: {
      toDisplay: false,
      errorCode: "",
    },

    username: {
      toDisplay: false,
      errorCode: "",
    },

    phone: {
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

    role: {
      toDisplay: false,
      errorCode: "",
    },
  });

  useFocusIn({
    labelPos,
    setLabelPos,
    indicator,
    setIndicator,
    labels: ["email", "username", "password", "confirmPassword", "phone", "role"],
  });
  useFocusOut({
    labelPos,
    setLabelPos,
    focusOutData: registerData,
    labels: ["email", "username", "password", "confirmPassword", "phone"],
  });

  // Handle change in input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    id && Mappings.inputChangeMap[id](setRegisterData, registerData, value);
  };

  const startRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const handler = new Handler(startLoader, endLoader, setPopupDisplay, setIndicator);
    await handler.handleRegistration(registerData, isRegistrationComplete);
  };

  return (
    <form className="px-4 py-4 flex flex-col gap-6" onSubmit={startRegistration}>
      <EmailInput
        onChange={handleChange}
        value={registerData.email}
        labelPos={labelPos}
        indicator={indicator.email}
      />
      <UsernameInput
        onChange={handleChange}
        value={registerData.username}
        labelPos={labelPos}
        indicator={indicator.username}
      />
      <PhoneInput
        onChange={handleChange}
        value={registerData.phone}
        labelPos={labelPos}
        indicator={indicator.phone}
      />
      <PasswordInput
        onChange={handleChange}
        value={registerData.password}
        labelPos={labelPos}
        indicator={indicator.password}
      />
      <PasswordInput
        onChange={handleChange}
        value={registerData.confirmPassword ?? ""}
        labelPos={labelPos}
        inputName="Confirm Password*"
        id={InputTypes.CONFIRM_PASSWORD_INPUT}
        indicator={indicator.confirmPassword}
      />
      <RoleSelector value={registerData.role} onChange={handleChange} indicator={indicator.role} />
      <div>
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
      </div>
    </form>
  );
}
