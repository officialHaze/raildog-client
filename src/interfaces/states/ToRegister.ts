export default interface IsUserRegistering {
  type: string;
  payload: boolean;
}

export type ToRegister = (toRegister: boolean) => IsUserRegistering;
