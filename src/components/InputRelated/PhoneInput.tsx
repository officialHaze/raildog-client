import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";
import { useRef } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import Label from "./Label";

export default function PhoneInput({ labelPos, onChange, value }: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative email flex items-center">
      <input
        onChange={onChange}
        value={!value ? "" : value}
        id={InputTypes.PHONE_INPUT}
        type="text"
        ref={ref_}
      />
      <Label children="Phone no.*" className={`${labelPos.phone}`} ref_={ref_} />
      <BsFillTelephoneFill className="input-icon text-lg" />
    </div>
  );
}
