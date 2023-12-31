import { useEffect } from "react";
import { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";
import EmailInput from "../InputRelated/EmailInput";
import UsernameInput from "../InputRelated/UsernameInput";
import PhoneInput from "../InputRelated/PhoneInput";
import PasswordInput from "../InputRelated/PasswordInput";

interface Props {
  registerData: RegistrationData;
  setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  labelPos: RegistrationData;
  setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>;
  emailInputRef: React.MutableRefObject<HTMLInputElement | null>;
  usernameInputRef: React.MutableRefObject<HTMLInputElement | null>;
  phoneInputRef: React.MutableRefObject<HTMLInputElement | null>;
  passwordInputRef: React.MutableRefObject<HTMLInputElement | null>;
  confirmPassInputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export default function RegisterForm({
  registerData,
  setRegisterData,
  labelPos,
  setLabelPos,
  emailInputRef,
  usernameInputRef,
  phoneInputRef,
  passwordInputRef,
  confirmPassInputRef,
}: Props) {
  // Monitor and handle focus in any of the input fields
  useEffect(() => {
    const handleFocusin = (e: any) => {
      const id = e.target.id;
      console.log("Focused in: ", id);

      switch (id) {
        case InputTypes.EMAIL:
          setLabelPos({
            ...labelPos,
            email: "-translate-y-[1.45rem] text-sm text-blue-500",
          });
          break;

        case InputTypes.USERNAME:
          setLabelPos({
            ...labelPos,
            username: "-translate-y-[1.45rem] text-sm text-blue-500",
          });
          break;

        case InputTypes.PHONE:
          setLabelPos({
            ...labelPos,
            phone: "-translate-y-[1.45rem] text-sm text-blue-500",
          });
          break;

        case InputTypes.PASSWORD:
          setLabelPos({
            ...labelPos,
            password: "-translate-y-[1.45rem] text-sm text-blue-500",
          });
          break;

        case InputTypes.CONFIRM_PASSWORD:
          setLabelPos({
            ...labelPos,
            confirmPassword: "-translate-y-[1.45rem] text-sm text-blue-500",
          });
          break;

        default:
          break;
      }
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
      console.log("Focused out: ", id);
      console.log(registerData.email);

      switch (id) {
        case InputTypes.EMAIL:
          !registerData.email &&
            setLabelPos({
              ...labelPos,
              email: "",
            });
          break;

        case InputTypes.USERNAME:
          !registerData.username &&
            setLabelPos({
              ...labelPos,
              username: "",
            });
          break;

        case InputTypes.PHONE:
          !registerData.phone &&
            setLabelPos({
              ...labelPos,
              phone: "",
            });
          break;

        case InputTypes.PASSWORD:
          !registerData.password &&
            setLabelPos({
              ...labelPos,
              password: "",
            });
          break;

        case InputTypes.CONFIRM_PASSWORD:
          !registerData.confirmPassword &&
            setLabelPos({
              ...labelPos,
              confirmPassword: "",
            });
          break;

        default:
          break;
      }
    };
    document.addEventListener("focusout", handleFocusout);
    return () => {
      document.removeEventListener("focusout", handleFocusout);
    };
  }, [labelPos, setLabelPos, registerData]);

  // Handle change in input values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;

    switch (id) {
      case InputTypes.EMAIL:
        setRegisterData({
          ...registerData,
          email: value,
        });
        break;

      case InputTypes.USERNAME:
        setRegisterData({
          ...registerData,
          username: value,
        });
        break;

      case InputTypes.PHONE:
        value.length <= 10 &&
          setRegisterData({
            ...registerData,
            phone: parseInt(value),
          });
        break;

      case InputTypes.PASSWORD:
        setRegisterData({
          ...registerData,
          password: value,
        });
        break;

      case InputTypes.CONFIRM_PASSWORD:
        setRegisterData({
          ...registerData,
          confirmPassword: value,
        });
        break;

      default:
        break;
    }
  };

  return (
    <form className="px-4 py-4 flex flex-col gap-6">
      <EmailInput
        ref_={emailInputRef}
        onChange={handleChange}
        value={registerData.email}
        labelPos={labelPos}
      />
      <UsernameInput
        ref_={usernameInputRef}
        onChange={handleChange}
        value={registerData.username}
        labelPos={labelPos}
      />
      <PhoneInput
        ref_={phoneInputRef}
        onChange={handleChange}
        value={registerData.phone}
        labelPos={labelPos}
      />
      <PasswordInput
        ref_={passwordInputRef}
        onChange={handleChange}
        value={registerData.password}
        labelPos={labelPos}
      />
      <PasswordInput
        ref_={confirmPassInputRef}
        onChange={handleChange}
        value={registerData.confirmPassword}
        labelPos={labelPos}
        inputName="Confirm Password*"
        id={InputTypes.CONFIRM_PASSWORD}
      />
    </form>
  );
}
