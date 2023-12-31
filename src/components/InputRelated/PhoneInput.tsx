import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";

export default function PhoneInput({ labelPos, onChange, value }: AuthInputProps) {
  return (
    <div className="relative email flex items-center">
      <input onChange={onChange} value={!value ? "" : value} id={InputTypes.PHONE} type="text" />
      <div className={`absolute left-2 bg-[#191919] px-2 transition ${labelPos.phone}`}>
        Phone no.*
      </div>
    </div>
  );
}
