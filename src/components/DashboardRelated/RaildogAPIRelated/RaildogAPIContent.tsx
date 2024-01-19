import { useContext, useState } from "react";
import Constants from "../../../classes/Constants";
import apidoc from "../../../json/api.doc.json";
import GetTrainsReqBody from "../../../interfaces/states/GetTrainsReqBody";
import Validator from "../../../classes/Validator";
import Handler from "../../../classes/Handler";
import { useLoader } from "../../../utils/customHooks";
import { PopupContext } from "../../../App";
import ResponseStatusObj from "../../../interfaces/states/ResponseStatusObj";
import FindTrainsAPI, { FindTrainsAPICompProps } from "./FindTrainsAPI";
import GetLiveStatusReqBody from "../../../interfaces/states/GetLiveStatusReqBody";
import LiveStatusAPI, { LiveStatusAPICompProps } from "./LiveStatusAPI";
import LiveStatusData from "../../../interfaces/LiveStatusData";
import LiveStatusAuthData from "../../../interfaces/LiveStatusAuthData";

export interface GetTrainsResponse {
  message: string;
  available_trains: any[];
}

export interface GetLiveStatusSuccessResponse {
  message: string;
  live_status: LiveStatusData[];
}
export interface GetLiveStatusAuthResponse {
  message: LiveStatusAuthData;
}

export interface ErrorResponse {
  error: string;
}

export default function RaildogAPIContent() {
  const [apikey, setApikey] = useState("{API_KEY}");
  const [getTrainsRequestBody, setGetTrainsRequestBody] = useState<GetTrainsReqBody>({
    startStation: "",
    stopStation: "",
    travelDate: "",
  });
  const [getLiveStatusRequestBody, setGetLiveStatusRequestBody] = useState<GetLiveStatusReqBody>({
    phpsessid: "",
    train_no: "",
    train_name: "",
    at_stn: "",
    date: "",
  });
  const [getTrainsresponse, setGetTrainsResponse] = useState<GetTrainsResponse | ErrorResponse>({
    message: "",
    available_trains: [],
  });
  const [liveStatusResponse, setLiveStatusResponse] = useState<
    GetLiveStatusSuccessResponse | GetLiveStatusAuthResponse | ErrorResponse | null
  >(null);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();
  const setPopup = useContext(PopupContext);
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

        setGetTrainsRequestBody({
          ...getTrainsRequestBody,
          startStation: value,
        });
        break;

      case Constants.STOP_STATION:
        // Remove any pre-loaded error
        removeError(Constants.STOP_STATION);

        setGetTrainsRequestBody({
          ...getTrainsRequestBody,
          stopStation: value,
        });
        break;

      case Constants.TRAVEL_DATE:
        // Remove any pre-loaded error
        removeError(Constants.TRAVEL_DATE);

        setGetTrainsRequestBody({
          ...getTrainsRequestBody,
          travelDate: value,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id: formType } = e.currentTarget;
    try {
      const handler = new Handler(startLoader, endLoader, setPopup);

      switch (formType) {
        case Constants.GET_TRAINS:
          // Validate if all required fields are present
          Validator.validateGetTrainsReqBodyData(
            getTrainsRequestBody,
            !apikey.includes("{") ? apikey : ""
          );
          const res = await handler.handleGettingTrainList(getTrainsRequestBody, apikey);
          setGetTrainsResponse(res?.data);
          setResStatusObj({
            status: res?.status ?? NaN,
            statusText: res?.statusText ?? "",
          });
          break;

        default:
          break;
      }
    } catch (err: any) {
      console.error(err);
      if (err.errorCode && err.payload) {
        const invalidFields: string[] = err.payload;
        setInvalidFields(invalidFields);
      }
      // Display any error on the json viewer as well
      setGetTrainsResponse({
        error: err?.response?.data?.Error?.message ?? "Some error occurred!",
      });
      setResStatusObj({
        status: err?.response?.status ?? NaN,
        statusText: err?.response?.statusText ?? "",
      });
    }
  };

  // Component props
  const findTrainsCompProps: FindTrainsAPICompProps = {
    invalidFields,
    isLoaderRunning,
    handleChange,
    handleSubmit,
    apikey,
    response: getTrainsresponse,
    requestBody: getTrainsRequestBody,
    resStatusObj,
  };

  const liveStatusCompProps: LiveStatusAPICompProps = {
    invalidFields,
    isLoaderRunning,
    handleChange,
    handleSubmit,
    apikey,
    response: liveStatusResponse ?? { message: "", live_status: [] }, // If live status response is null, pass a default param
    requestBody: getLiveStatusRequestBody,
    resStatusObj,
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

      <div className="flex flex-col gap-4">
        <FindTrainsAPI {...findTrainsCompProps} />
        <LiveStatusAPI {...liveStatusCompProps} />
      </div>
    </div>
  );
}
