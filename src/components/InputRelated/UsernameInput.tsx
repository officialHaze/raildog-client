import { AuthInputProps } from "./EmailInput";
import { ErrorTexts, InputTypes } from "../../classes/Constants";
import { useRef } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import Label from "./Label";
import Indicator from "./Indicator";

export default function UsernameInput({
  labelPos,
  onChange,
  value,
  indicator,
  isLoginComponent,
}: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <div className="relative email flex items-center">
        <input
          onChange={onChange}
          value={value}
          id={InputTypes.USERNAME_INPUT}
          type="text"
          ref={ref_}
          className={indicator.toDisplay ? "focus:outline-red-500 outline-red-500" : ""}
          autoComplete={isLoginComponent ? "off" : "on"}
        />
        <Label
          children={!isLoginComponent ? "Username*" : "Username or email*"}
          ref_={ref_}
          className={`${labelPos.username} ${indicator.toDisplay && "text-red-500"}`}
        />
        <FaUserAstronaut className="input-icon" />
      </div>
      {indicator.toDisplay && (
        <Indicator
          className="text-red-500 mt-2"
          message={ErrorTexts.INVALID_USERNAME[indicator.errorCode]}
        />
      )}
    </div>
  );
}
