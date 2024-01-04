import { AuthInputProps } from "./EmailInput";
import { ErrorTexts, InputTypes } from "../../classes/Constants";
import { useRef, useState } from "react";
import { TbEyeFilled } from "react-icons/tb";
import { PiEyeSlashFill } from "react-icons/pi";
import Label from "./Label";
import Indicator from "./Indicator";

export default function PasswordInput({
  labelPos,
  onChange,
  value,
  inputName,
  id,
  indicator,
}: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  const [showPass, toShowPass] = useState(false);

  return (
    <div>
      <div className="relative email flex items-center">
        <input
          onChange={onChange}
          value={value}
          id={!id ? InputTypes.PASSWORD_INPUT : id}
          type={showPass ? "text" : "password"}
          ref={ref_}
          className={indicator.toDisplay ? "focus:outline-red-500 outline-red-500" : ""}
        />
        <Label
          ref_={ref_}
          children={!inputName ? "Password*" : inputName}
          className={`${
            id !== InputTypes.CONFIRM_PASSWORD_INPUT ? labelPos.password : labelPos.confirmPassword
          } ${indicator.toDisplay && "text-red-500"}`}
        />

        {!showPass ? (
          <PiEyeSlashFill className="input-icon" onClick={() => toShowPass(true)} />
        ) : (
          <TbEyeFilled className="input-icon" onClick={() => toShowPass(false)} />
        )}
      </div>
      {indicator.toDisplay && (
        <Indicator
          className="text-red-500 mt-2"
          message={
            id !== InputTypes.CONFIRM_PASSWORD_INPUT
              ? ErrorTexts.INVALID_PASSWORD[indicator.errorCode]
              : ErrorTexts.INVALID_CONFIRM_PASSWORD[indicator.errorCode]
          }
        />
      )}
    </div>
  );
}
