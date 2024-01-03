import { AuthInputProps } from "./EmailInput";
import { ErrorTexts, InputTypes } from "../../classes/Constants";
import { useRef } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import Label from "./Label";
import Indicator from "./Indicator";

export default function PhoneInput({ labelPos, onChange, value, indicator }: AuthInputProps) {
  const ref_ = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <div className="relative email flex items-center">
        <input
          onChange={onChange}
          value={!value ? "" : value}
          id={InputTypes.PHONE_INPUT}
          type="text"
          ref={ref_}
          className={indicator.toDisplay ? "focus:outline-red-500 outline-red-500" : ""}
        />
        <Label
          children="Phone no.*"
          className={`${labelPos.phone} ${indicator.toDisplay && "text-red-500"}`}
          ref_={ref_}
        />
        <BsFillTelephoneFill className="input-icon text-lg" />
      </div>
      {indicator.toDisplay && (
        <Indicator
          className="text-red-500 mt-2"
          message={ErrorTexts.INVALID_PHONE[indicator.errorCode]}
        />
      )}
    </div>
  );
}
