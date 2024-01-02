import React, { useRef } from "react";
import { InputTypes } from "../../classes/Constants";
import RegistrationData from "../../interfaces/RegistrationData";
import { MdEmail } from "react-icons/md";
import Label from "./Label";

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
      <Label children="Email*" ref_={ref} className={`${labelPos.email}`} />
      <MdEmail className="input-icon" />
    </div>
  );
}
