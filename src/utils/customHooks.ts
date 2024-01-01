import { useState } from "react";
import RegistrationData from "../interfaces/RegistrationData";
import LoginData from "../interfaces/LoginData";

export const useRegistrationLabel = (): [
  label: RegistrationData,
  setLabel: React.Dispatch<React.SetStateAction<RegistrationData>>,
  reset: () => void
] => {
  const [labelPos, setLabelPos] = useState<RegistrationData>({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const reset = () => {
    setLabelPos({
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };

  return [labelPos, setLabelPos, reset];
};

export const useLoginLabel = (): [
  label: LoginData,
  setLabel: React.Dispatch<React.SetStateAction<LoginData>>,
  reset: () => void
] => {
  const [labelPos, setLabelPos] = useState<LoginData>({
    username: "",
    password: "",
  });

  const reset = () => {
    setLabelPos({
      username: "",
      password: "",
    });
  };

  return [labelPos, setLabelPos, reset];
};
