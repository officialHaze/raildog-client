export default interface LoginData {
  username: string;
  password: string;
}

export interface LoginDataToSubmit {
  username_or_email: string;
  password: string;
}
