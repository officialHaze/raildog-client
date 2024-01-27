import { useState } from "react";
import Constants, { SidePanelOptionsId } from "../../../classes/Constants";
import BypassCaptchaReqBody from "../../../interfaces/states/BypassCaptchaReqBody";
import ResponseStatusObj from "../../../interfaces/states/ResponseStatusObj";
import isEmptyList from "../../../utils/isEmptyList";
import JsonViewer from "../../Decorations/JsonViewer";
import APIEndpoint from "./APIEndpoint";
import GetResponseBtn from "./GetResponseBtn";
import { BypassCaptchaResponse, ErrorResponse } from "./RaildogAPIContent";
import StatusChart from "./StatusChart";

export interface BypassCaptchaAPICompProps {
  invalidFields: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  response: BypassCaptchaResponse | ErrorResponse;
  apikey: string;
  resStatusObj: ResponseStatusObj | null;
  requestBody: BypassCaptchaReqBody;
  isLoaderRunning: boolean;
}

export default function BypassCaptchaAPI({
  invalidFields,
  handleChange,
  handleSubmit,
  response,
  requestBody,
  resStatusObj,
  isLoaderRunning,
  apikey,
}: BypassCaptchaAPICompProps) {
  const [captchaBase64, setCaptchaBase64] = useState("");

  // Handle captcha display
  const displayCaptcha = () => {
    setCaptchaBase64(requestBody.captchaBase64);
  };

  return (
    <div>
      <div id={SidePanelOptionsId.RAILDOG_SUB_BYPASS_CAPTCHA} className="header p-4 white-border">
        <h1>Bypass Captcha</h1>
      </div>

      <div className="para text-lg px-4 py-4 flex flex-col gap-4">
        <p>
          Call this API when you get a 403 response while querying the Live Status API. All The
          fields required to make a successful request are provided in the 403 response itself and
          are also mentioned below.
        </p>
        <p>
          <span className="font-bold">Required</span> : API Key.
        </p>
        <p>
          <span className="font-bold">Required</span> : captchaCode (Preview the captcha image from
          the 'captchaDataUrl' field received in the 403 response).
        </p>
        <p>
          <span className="font-bold">Required</span> : sD (Provided in the 403 response).
        </p>
        <p>
          <span className="font-bold">Required</span> : phpsessid (Provided in the 403 response).
        </p>
        <p>
          <span className="font-bold">Required</span> : captchaOptions (Provided in the 403
          response).
        </p>

        <APIEndpoint apikey={apikey} />

        <div className="flex flex-col xl:flex-row justify-between py-6">
          <form
            id={Constants.BYPASS_CAPTCHA}
            className="required-fields flex flex-col gap-8 pr-0 xl:pr-14 w-full xl:w-[50%]"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">API key: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.API_KEY}
                  value={apikey.includes("{") ? "" : apikey}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.API_KEY) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">captchaCode: </p>
              <div className="w-[50%]">
                <input
                  id={Constants.CAPTCHA_CODE}
                  value={requestBody.captchaCode}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.CAPTCHA_CODE) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
              {requestBody.captchaBase64 && (
                <div>
                  <i
                    onClick={displayCaptcha}
                    className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md text-sm font-bold cursor-pointer"
                  >
                    Show Captcha
                  </i>
                  {captchaBase64 && <img className="mt-2" src={captchaBase64} alt="captcha" />}
                </div>
              )}
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">sD: </p>
              <div className="w-[80%]">
                <input
                  disabled
                  id={Constants.SD}
                  value={requestBody.sD}
                  // onChange={handleChange}
                  // autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.SD) && "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">
                  *This field will be autofilled if you get a 403 error in Live Status API
                </em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">phpsessid: </p>
              <div className="w-[80%]">
                <input
                  disabled
                  id={Constants.BYPASS_CAPTCHA_PHPSESSID}
                  value={requestBody.phpsessid}
                  // onChange={handleChange}
                  // autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.BYPASS_CAPTCHA_PHPSESSID) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">
                  *This field will be autofilled if you get a 403 error in Live Status API
                </em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">captchaOptions: </p>
              <div className="w-[80%] max-h-[10rem] overflow-auto p-2">
                {!isEmptyList(requestBody.captchaOptions) ? (
                  requestBody.captchaOptions.map((obj, i) => (
                    <input key={i} value={JSON.stringify(obj, null, 2)} disabled className="mb-6" />
                  ))
                ) : (
                  <input disabled />
                )}
                <em className="text-sm">
                  *This field will be autofilled if you get a 403 error in Live Status API
                </em>
              </div>
            </div>
            <GetResponseBtn isLoaderRunning={isLoaderRunning} />
          </form>

          <JsonViewer
            className="w-full xl:w-[50%] h-full"
            json={JSON.stringify(response, null, 2)}
            status={resStatusObj?.status ?? NaN}
            statusText={resStatusObj?.statusText ?? ""}
          />
        </div>
        <StatusChart
          rows={[
            <tr>
              <td className="py-2 px-4 white-border-all text-green-500">200</td>
              <td className="py-2 px-4 white-border-all">
                Good response. You should get a success message and a phpsessid that you can use to
                query the live status API.
              </td>
            </tr>,
          ]}
        />
      </div>
    </div>
  );
}
