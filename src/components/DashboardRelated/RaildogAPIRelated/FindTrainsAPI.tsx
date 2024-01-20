import Constants, { SidePanelOptionsId } from "../../../classes/Constants";
import GetTrainsReqBody from "../../../interfaces/states/GetTrainsReqBody";
import ResponseStatusObj from "../../../interfaces/states/ResponseStatusObj";
import JsonViewer from "../../Decorations/JsonViewer";
import Loader from "../../Loader/Loader";
import { ErrorResponse, GetTrainsResponse } from "./RaildogAPIContent";
import StatusChart from "./StatusChart";

export interface FindTrainsAPICompProps {
  invalidFields: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  response: GetTrainsResponse | ErrorResponse;
  apikey: string;
  resStatusObj: ResponseStatusObj | null;
  requestBody: GetTrainsReqBody;
  isLoaderRunning: boolean;
}

export default function FindTrainsAPI({
  invalidFields,
  handleChange,
  handleSubmit,
  response,
  apikey,
  resStatusObj,
  requestBody,
  isLoaderRunning,
}: FindTrainsAPICompProps) {
  return (
    <>
      <div id={SidePanelOptionsId.RAILDOG_SUB_SNIFF_TRAINS} className="header p-4 white-border">
        <h1>Find Trains</h1>
      </div>

      <div className="para text-lg px-4 py-4 flex flex-col gap-4">
        <p>Get a list of trains for a given time period.</p>
        <p>
          <span className="font-bold">Required</span> : API Key.
        </p>
        <p>
          <span className="font-bold">Required</span> : startStation (source).
        </p>
        <p>
          <span className="font-bold">Required</span> : stopStation (destination).
        </p>
        <p>
          <span className="font-bold">Not Required</span> : travelDate (YYYYMMDD).
        </p>

        <div className="flex w-full items-center py-4 gap-2">
          <p className="w-[10%]">API Endpoint: </p>
          <div>
            <em className="font-bold">{`${process.env.REACT_APP_API_ENDPOINT}/api/get_trains?key=${apikey}`}</em>
          </div>
        </div>

        <div className="flex justify-between py-6">
          <form
            id={Constants.GET_TRAINS}
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
              <p className="w-[20%]">startStation: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.START_STATION}
                  value={requestBody.startStation}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.START_STATION) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">stopStation: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.STOP_STATION}
                  value={requestBody.stopStation}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.STOP_STATION) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
                <em className="text-sm">*Required</em>
              </div>
            </div>

            <div className="flex w-full items-start gap-4">
              <p className="w-[20%]">travelDate: </p>
              <div className="w-[80%]">
                <input
                  id={Constants.TRAVEL_DATE}
                  value={requestBody.travelDate}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`${
                    invalidFields.includes(Constants.TRAVEL_DATE) &&
                    "outline-red-500 focus:outline-red-500"
                  }`}
                />
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
            className="w-[50%]"
            json={JSON.stringify(response, null, 2)}
            status={resStatusObj?.status ?? NaN}
            statusText={resStatusObj?.statusText ?? ""}
          />
        </div>
        <StatusChart apiName={Constants.GET_TRAINS} />
      </div>
    </>
  );
}
