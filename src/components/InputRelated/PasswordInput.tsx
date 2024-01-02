import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";
import { useRef, useState } from "react";
import { TbEyeFilled } from "react-icons/tb";
import { PiEyeSlashFill } from "react-icons/pi";
import Label from "./Label";

export default function PasswordInput({
  labelPos,
  onChange,
  value,
  inputName,
  id,
}: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  const [showPass, toShowPass] = useState(false);

  return (
    <div className="relative email flex items-center">
      <input
        onChange={onChange}
        value={value}
        id={!id ? InputTypes.PASSWORD_INPUT : id}
        type={showPass ? "text" : "password"}
        ref={ref_}
      />
      <Label
        ref_={ref_}
        children={!inputName ? "Password*" : inputName}
        className={`${
          id !== InputTypes.CONFIRM_PASSWORD_INPUT ? labelPos.password : labelPos.confirmPassword
        }`}
      />

      {!showPass ? (
        <PiEyeSlashFill className="input-icon" onClick={() => toShowPass(true)} />
      ) : (
        <TbEyeFilled className="input-icon" onClick={() => toShowPass(false)} />
      )}
    </div>
  );
}
