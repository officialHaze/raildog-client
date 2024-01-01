import React, { useRef } from "react";
import { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";

export interface AuthInputProps {
  labelPos: RegistrationData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  inputName?: string;
  id?: string;
}

export default function EmailInput({ labelPos, onChange, value }: AuthInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="relative email flex items-center">
      <input id={InputTypes.EMAIL_INPUT} type="email" onChange={onChange} value={value} ref={ref} />
      <div
        onClick={() => ref?.current?.focus()}
        className={`absolute left-2 bg-[#191919] px-2 transition ${labelPos.email}`}
      >
        Email*
      </div>
    </div>
  );
}
