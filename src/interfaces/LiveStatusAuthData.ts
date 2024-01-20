export default interface LiveStatusAuthData {
  sD: string;
  phpsessid: string;
  captchaOptions: CaptchaOption[];
  captchaDataUrl: string;
}

interface CaptchaOption {
  captchaCode: string;
  captchaCodeIdx: number;
}
