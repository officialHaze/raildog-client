import React from "react";
import { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";

export interface AuthInputProps {
  labelPos: RegistrationData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

export default function EmailInput({ labelPos, onChange, value }: AuthInputProps) {
  return (
    <div className="relative email flex items-center">
      <input id={InputTypes.EMAIL} type="email" onChange={onChange} value={value} />
      <div className={`absolute left-2 bg-[#191919] px-2 transition ${labelPos.email}`}>Email*</div>
    </div>
  );
}
