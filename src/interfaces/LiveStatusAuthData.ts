export default interface LiveStatusAuthData {
  sD: string;
  phpsessid: string;
  captchaOptions: CaptchaOption[];
  captchaDataUrl: string;
}

export interface CaptchaOption {
  captchaCode: string;
  captchaCodeIdx: number;
}
