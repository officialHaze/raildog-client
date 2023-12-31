import { useEffect } from "react";
import { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";
import EmailInput from "../InputRelated/EmailInput";
import UsernameInput from "../InputRelated/UsernameInput";
import PhoneInput from "../InputRelated/PhoneInput";

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

      default:
        break;
    }
  };

  return (
    <form className="px-4 py-4 flex flex-col gap-6">
      <EmailInput onChange={handleChange} value={registerData.email} labelPos={labelPos} />
      <UsernameInput onChange={handleChange} value={registerData.username} labelPos={labelPos} />
      <PhoneInput onChange={handleChange} value={registerData.phone} labelPos={labelPos} />
    </form>
  );
}
