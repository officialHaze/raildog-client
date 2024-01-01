import RegistrationData from "../interfaces/RegistrationData";

export default class Mappings {
  public static focusInMap: any = {
    EMAIL_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>
    ) =>
      setLabelPos({
        ...labelPos,
        email: "-translate-y-[1.45rem] text-sm text-blue-500",
      }),

    USERNAME_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>
    ) =>
      setLabelPos({
        ...labelPos,
        username: "-translate-y-[1.45rem] text-sm text-blue-500",
      }),

    PHONE_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>
    ) =>
      setLabelPos({
        ...labelPos,
        phone: "-translate-y-[1.45rem] text-sm text-blue-500",
      }),

    PASSWORD_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>
    ) =>
      setLabelPos({
        ...labelPos,
        password: "-translate-y-[1.45rem] text-sm text-blue-500",
      }),

    CONFIRM_PASSWORD_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>
    ) =>
      setLabelPos({
        ...labelPos,
        confirmPassword: "-translate-y-[1.45rem] text-sm text-blue-500",
      }),
  };

  public static focusOutMap: any = {
    EMAIL_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData
    ) =>
      !registerData.email &&
      setLabelPos({
        ...labelPos,
        email: "",
      }),

    USERNAME_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData
    ) =>
      !registerData.username &&
      setLabelPos({
        ...labelPos,
        username: "",
      }),

    PHONE_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData
    ) =>
      !registerData.phone &&
      setLabelPos({
        ...labelPos,
        phone: "",
      }),

    PASSWORD_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData
    ) =>
      !registerData.password &&
      setLabelPos({
        ...labelPos,
        password: "",
      }),

    CONFIRM_PASSWORD_INPUT: (
      labelPos: RegistrationData,
      setLabelPos: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData
    ) =>
      !registerData.confirmPassword &&
      setLabelPos({
        ...labelPos,
        confirmPassword: "",
      }),
  };

  public static inputChangeMap: any = {
    EMAIL_INPUT: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        email: value,
      }),

    USERNAME_INPUT: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        username: value,
      }),

    PHONE_INPUT: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      value.length <= 10 &&
      setRegisterData({
        ...registerData,
        phone: parseInt(value) ?? 0,
      }),

    PASSWORD_INPUT: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        password: value,
      }),

    CONFIRM_PASSWORD_INPUT: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        confirmPassword: value,
      }),

    INDIVIDUAL_ROLE: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        role: "individual",
      }),

    DEVELOPER_ROLE: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        role: "developer",
      }),

    BUSINESS_ROLE: (
      setRegisterData: React.Dispatch<React.SetStateAction<RegistrationData>>,
      registerData: RegistrationData,
      value: string
    ) =>
      setRegisterData({
        ...registerData,
        role: "business",
      }),
  };
}
