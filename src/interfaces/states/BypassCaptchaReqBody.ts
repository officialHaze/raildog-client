import { CaptchaOption } from "../LiveStatusAuthData";

export default interface BypassCaptchaReqBody {
  captchaCode: string;
  sD: string;
  phpsessid: string;
  captchaOptions: CaptchaOption[];
}
