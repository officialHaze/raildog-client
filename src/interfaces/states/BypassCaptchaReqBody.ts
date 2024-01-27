import { CaptchaOption } from "../LiveStatusAuthData";

export default interface BypassCaptchaReqBody {
  captchaCode: string;
  sD: string;
  phpsessid: string;
  captchaOptions: CaptchaOption[];
  captchaBase64: string;
}
