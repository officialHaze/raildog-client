import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";
import { useRef } from "react";

export default function PhoneInput({ labelPos, onChange, value }: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative email flex items-center">
      <input
        onChange={onChange}
        value={!value ? "" : value}
        id={InputTypes.PHONE}
        type="text"
        ref={ref_}
      />
      <div
        onClick={() => ref_?.current?.focus()}
        className={`absolute left-2 bg-[#191919] px-2 transition ${labelPos.phone}`}
      >
        Phone no.*
      </div>
    </div>
  );
}
