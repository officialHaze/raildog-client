import Constants, { SidePanelOptionsId } from "../../../classes/Constants";
import GetLiveStatusReqBody from "../../../interfaces/states/GetLiveStatusReqBody";
import ResponseStatusObj from "../../../interfaces/states/ResponseStatusObj";
import JsonViewer from "../../Decorations/JsonViewer";
import Loader from "../../Loader/Loader";
import {
  ErrorResponse,
  GetLiveStatusAuthResponse,
  GetLiveStatusSuccessResponse,
} from "./RaildogAPIContent";

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
    <>
      <div
        id={SidePanelOptionsId.RAILDOG_SUB_SNIFF_LIVE_STATUS}
        className="header p-4 white-border"
      >
        <h1>Live Status</h1>
      </div>

      <div className="para text-lg px-4 py-4 flex flex-col gap-4">
        <p>Get live status of a particular train</p>
        <p>
          <span className="font-bold">Required</span> : API Key.
        </p>
        <p>
          <span className="font-bold">Required</span> : phpsessid (leave empty to trigger
          authentication and receive a new ID).
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

        <div className="flex w-full items-center py-4 gap-2">
          <p className="w-[10%]">API Endpoint: </p>
          <div>
            <em className="font-bold">{`${process.env.REACT_APP_API_ENDPOINT}/api/get_live_status?key=${apikey}`}</em>
          </div>
        </div>

        <div className="flex justify-between py-6">
          <form
            id={Constants.GET_LIVE_STATUS}
            className="required-fields flex flex-col gap-8 pr-20 w-[50%]"
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

            <div className="py-4">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 hover:bg-blue-400 rounded-md w-[30%]"
              >
                {isLoaderRunning ? <Loader /> : "Get Response"}
              </button>
            </div>
          </form>

          <JsonViewer
            className="w-[50%] h-full"
            json={JSON.stringify(response, null, 2)}
            status={resStatusObj?.status ?? NaN}
            statusText={resStatusObj?.statusText ?? ""}
          />
        </div>
      </div>
    </>
  );
}
