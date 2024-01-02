import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";
import { useRef } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import Label from "./Label";

export default function UsernameInput({ labelPos, onChange, value }: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative email flex items-center">
      <input
        onChange={onChange}
        value={value}
        id={InputTypes.USERNAME_INPUT}
        type="text"
        ref={ref_}
      />
      <Label children="Username*" ref_={ref_} className={`${labelPos.username}`} />
      <FaUserAstronaut className="input-icon" />
    </div>
  );
}
