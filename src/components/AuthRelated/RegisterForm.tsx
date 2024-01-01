import { useEffect } from "react";
import { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";
import EmailInput from "../InputRelated/EmailInput";
import UsernameInput from "../InputRelated/UsernameInput";
import PhoneInput from "../InputRelated/PhoneInput";
import PasswordInput from "../InputRelated/PasswordInput";
import RoleSelector from "../InputRelated/RoleSelector";
import SubmitBtn from "../InputRelated/SubmitBtn";
import Mappings from "../../classes/Mappings";

interface Props {
  registerData: RegistrationData;
  setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  labelPos: RegistrationData;
  setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>;
}

export default function RegisterForm({
  registerData,
  setRegisterData,
  labelPos,
  setLabelPos,
}: Props) {
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

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("REGISTRATION DATA: ", registerData);
  };

  return (
    <form className="px-4 py-4 flex flex-col gap-6" onSubmit={handleRegistration}>
      <EmailInput onChange={handleChange} value={registerData.email} labelPos={labelPos} />
      <UsernameInput onChange={handleChange} value={registerData.username} labelPos={labelPos} />
      <PhoneInput onChange={handleChange} value={registerData.phone} labelPos={labelPos} />
      <PasswordInput onChange={handleChange} value={registerData.password} labelPos={labelPos} />
      <PasswordInput
        onChange={handleChange}
        value={registerData.confirmPassword}
        labelPos={labelPos}
        inputName="Confirm Password*"
        id={InputTypes.CONFIRM_PASSWORD_INPUT}
      />
      <RoleSelector value={registerData.role} onChange={handleChange} />
      <SubmitBtn btnDisplayText="Register" />
    </form>
  );
}