import { useContext, useState } from "react";
import Constants, { SidePanelOptionsId } from "../../../classes/Constants";
import apidoc from "../../../json/api.doc.json";
import GetTrainsReqBody from "../../../interfaces/GetTrainsReqBody";
import Validator from "../../../classes/Validator";
import Handler from "../../../classes/Handler";
import { useLoader } from "../../../utils/customHooks";
import Loader from "../../Loader/Loader";
import { PopupContext } from "../../../App";
import JsonViewer from "../../Decorations/JsonViewer";
import ResponseStatusObj from "../../../interfaces/states/ResponseStatusObj";

interface GetTrainsResponse {
  message: string;
  available_trains: any[];
}
interface ErrorResponse {
  error: string;
}

export default function RaildogAPIContent() {
  const [apikey, setApikey] = useState("{API_KEY}");
  const [requestBody, setRequestBody] = useState<GetTrainsReqBody>({
    startStation: "",
    stopStation: "",
    travelDate: "",
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();
  const setPopup = useContext(PopupContext);
  const [response, setResponse] = useState<GetTrainsResponse | ErrorResponse>({
    message: "",
    available_trains: [],
  });
  const [resStatusObj, setResStatusObj] = useState<ResponseStatusObj | null>(null);

  if (!setPopup) throw new Error("Popup ctx value is null!");

  const removeError = (invalidField: string) => {
    const idx = invalidFields.indexOf(invalidField);
    if (idx >= 0) {
      invalidFields.splice(idx, 1);
      setInvalidFields([...invalidFields]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: type, value } = e.currentTarget;

    switch (type) {
      case Constants.API_KEY:
        // Remove any pre-loaded error
        removeError(Constants.API_KEY);

        setApikey(value);
        break;

      case Constants.START_STATION:
        // Remove any pre-loaded error
        removeError(Constants.START_STATION);

        setRequestBody({
          ...requestBody,
          startStation: value,
        });
        break;

      case Constants.STOP_STATION:
        // Remove any pre-loaded error
        removeError(Constants.STOP_STATION);

        setRequestBody({
          ...requestBody,
          stopStation: value,
        });
        break;

      case Constants.TRAVEL_DATE:
        // Remove any pre-loaded error
        removeError(Constants.TRAVEL_DATE);

        setRequestBody({
          ...requestBody,
          travelDate: value,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate if all required fields are present
      Validator.validateGetTrainsReqBodyData(requestBody, !apikey.includes("{") ? apikey : "");

      const handler = new Handler(startLoader, endLoader, setPopup);
      const res = await handler.handleGettingTrainList(requestBody, apikey);
      setResponse(res?.data);
      setResStatusObj({
        status: res?.status ?? NaN,
        statusText: res?.statusText ?? "",
      });
    } catch (err: any) {
      console.error(err);
      if (err.errorCode && err.payload) {
        const invalidFields: string[] = err.payload;
        setInvalidFields(invalidFields);
      }
      // Display any error on the json viewer as well
      setResponse({
        error: err?.response?.data?.Error?.message ?? "Some error occurred!",
      });
      setResStatusObj({
        status: err?.response?.status ?? NaN,
        statusText: err?.response?.statusText ?? "",
      });
    }
  };

  return (
    <div className="px-14 py-8">
      <div className="header p-4 white-border">
        <h1>Raildog API</h1>
      </div>

      <div className="para text-lg px-4 py-4 flex flex-col gap-4">
        <p>{apidoc.intro}</p>
        <p>{apidoc.intro2}</p>
      </div>

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
      </div>
    </div>
  );
}
