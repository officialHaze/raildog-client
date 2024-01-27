import Constants, { SidePanelOptionsId } from "../../../classes/Constants";
import GetLiveStatusReqBody from "../../../interfaces/states/GetLiveStatusReqBody";
import ResponseStatusObj from "../../../interfaces/states/ResponseStatusObj";
import JsonViewer from "../../Decorations/JsonViewer";
import APIEndpoint from "./APIEndpoint";
import GetResponseBtn from "./GetResponseBtn";
import LiveStatus403ResponseRow from "./LiveStatus403ResponseRow";
import {
  ErrorResponse,
  GetLiveStatusAuthResponse,
  GetLiveStatusSuccessResponse,
} from "./RaildogAPIContent";
import StatusChart from "./StatusChart";

export interface LiveStatusAPICompProps {
  invalidFields: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  response: GetLiveStatusSuccessResponse | GetLiveStatusAuthResponse | ErrorResponse;
  apikey: string;
  resStatusObj: ResponseStatusObj | null;
  requestBody: GetLiveStatusReqBody;
  isLoaderRunning: boolean;
}

export default function LiveStatusAPI({
  invalidFields,
  handleChange,
  handleSubmit,
  response,
  apikey,
  resStatusObj,
  requestBody,
  isLoaderRunning,
}: LiveStatusAPICompProps) {
  return (
    <div>
      <div
        id={SidePanelOptionsId.RAILDOG_SUB_SNIFF_LIVE_STATUS}
        className="header p-4 white-border"
      >
        <h1>Live Status</h1>
      </div>

      <div className="para text-lg px-4 py-4 flex flex-col gap-4">
        <p>Get live status of a train</p>
        <p>
          <span className="font-bold">Required</span> : API Key.
        </p>
        <p>
          <span className="font-bold">Required</span> : train_no.
        </p>
        <p>
          <span className="font-bold">Required</span> : train_name.
        </p>
        <p>
          <span className="font-bold">Required</span> : at_stn (current station you are in).
        </p>
        <p>
          <span className="font-bold">Required</span> : date (DD-MM-YYYY).
        </p>
        <p>
          <span className="font-bold">
            <em>Preffered</em>
          </span>{" "}
          : phpsessid (leave empty to trigger authentication).
        </p>

        <APIEndpoint apikey={apikey} />

        <div className="flex flex-col xl:flex-row justify-between py-6">
          <form
            id={Constants.GET_LIVE_STATUS}
            className="required-fields flex flex-col gap-8 pr-0 xl:pr-20 w-full xl:w-[50%]"
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
              <p className="w-[20%]">train_no: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.TRAIN_NO}
                  value={requestBody.train_no}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.TRAIN_NO) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">train_name: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.TRAIN_NAME}
                  value={requestBody.train_name}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.TRAIN_NAME) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">at_stn: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.AT_STN}
                  value={requestBody.at_stn}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.AT_STN) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">date: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.DATE}
                  value={requestBody.date}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.DATE) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">phpsessid: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.PHPSESSID}
                  value={requestBody.phpsessid}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.PHPSESSID) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
              </div>
            </div>
            <GetResponseBtn isLoaderRunning={isLoaderRunning} />
          </form>

          <JsonViewer
            className="w-full xl:w-[50%]"
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
                Good response. You should get live status of the chosen train.
              </td>
            </tr>,
            <LiveStatus403ResponseRow />,
          ]}
        />
      </div>
    </div>
  );
}
