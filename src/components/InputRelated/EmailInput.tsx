import React, { useRef } from "react";
import { ErrorTexts, InputTypes } from "../../classes/Constants";
import { MdEmail } from "react-icons/md";
import Label from "./Label";
import Indicator from "./Indicator";
import LabelData from "../../interfaces/LabelData";

export interface AuthInputProps {
  labelPos: LabelData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  inputName?: string;
  id?: string;
  isLoginComponent?: boolean;
  indicator: {
    toDisplay: boolean;
    errorCode: string;
  };
}

export default function EmailInput({ labelPos, onChange, value, indicator }: AuthInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <div className="relative email flex items-center">
        <input
          id={InputTypes.EMAIL_INPUT}
          type="email"
          onChange={onChange}
          value={value}
          ref={ref}
          className={indicator.toDisplay ? "focus:outline-red-500 outline-red-500" : ""}
        />
        <Label
          children="Email*"
          ref_={ref}
          className={`${labelPos.email} ${indicator.toDisplay && "text-red-500"}`}
        />
        <MdEmail className="input-icon" />
      </div>
      {indicator.toDisplay && (
        <Indicator
          className="text-red-500 mt-2"
          message={ErrorTexts.INVALID_EMAIL[indicator.errorCode]}
        />
      )}
    </div>
  );
}
