import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";

export default function PasswordInput({
  labelPos,
  onChange,
  value,
  inputName,
  id,
  ref_,
}: AuthInputProps) {
  return (
    <div className="relative email flex items-center">
      <input
        onChange={onChange}
        value={value}
        id={!id ? InputTypes.PASSWORD : id}
        type="password"
        ref={ref_}
      />
      <div
        onClick={() => ref_?.current?.focus()}
        className={`absolute left-2 bg-[#191919] px-2 transition ${
          id !== InputTypes.CONFIRM_PASSWORD ? labelPos.password : labelPos.confirmPassword
        }`}
      >
        {!inputName ? "Password*" : inputName}
      </div>
    </div>
  );
}
