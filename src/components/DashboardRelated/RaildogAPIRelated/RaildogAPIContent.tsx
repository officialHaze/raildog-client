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
  const [getTrainsResStatusObj, setGetTrainsResStatusObj] = useState<ResponseStatusObj | null>(
    null
  );
  const [liveStatusResStatusObj, setLiveStatusResStatusObj] = useState<ResponseStatusObj | null>(
    null
  );

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

      case Constants.PHPSESSID:
        // Remove any pre-loaded error
        removeError(Constants.PHPSESSID);

        setGetLiveStatusRequestBody({
          ...getLiveStatusRequestBody,
          phpsessid: value,
        });
        break;

      case Constants.TRAIN_NO:
        // Remove any pre-loaded error
        removeError(Constants.TRAIN_NO);

        setGetLiveStatusRequestBody({
          ...getLiveStatusRequestBody,
          train_no: value,
        });
        break;

      case Constants.TRAIN_NAME:
        // Remove any pre-loaded error
        removeError(Constants.TRAIN_NAME);

        setGetLiveStatusRequestBody({
          ...getLiveStatusRequestBody,
          train_name: value,
        });
        break;

      case Constants.AT_STN:
        // Remove any pre-loaded error
        removeError(Constants.AT_STN);

        setGetLiveStatusRequestBody({
          ...getLiveStatusRequestBody,
          at_stn: value,
        });
        break;

      case Constants.DATE:
        // Remove any pre-loaded error
        removeError(Constants.DATE);

        setGetLiveStatusRequestBody({
          ...getLiveStatusRequestBody,
          date: value,
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
          setGetTrainsResStatusObj({
            status: res?.status ?? NaN,
            statusText: res?.statusText ?? "",
          });
          break;

        case Constants.GET_LIVE_STATUS:
          // Validate if all required fields are present
          Validator.validateLiveStatusReqBody(
            getLiveStatusRequestBody,
            !apikey.includes("{") ? apikey : ""
          );
          const liveStatusRes = await handler.handleGettingLiveStatus(
            getLiveStatusRequestBody,
            apikey
          );
          setLiveStatusResponse(liveStatusRes?.data);
          setLiveStatusResStatusObj({
            status: liveStatusRes?.status ?? NaN,
            statusText: liveStatusRes?.statusText ?? "",
          });
          break;

        default:
          break;
      }
    } catch (err: any) {
      console.error(err);
      if (err.errorCode && err.payload) {
        const invalidFields: string[] = err.payload;
        return setInvalidFields(invalidFields);
      }
      // Display any error on the json viewer
      switch (formType) {
        case Constants.GET_TRAINS:
          setGetTrainsResponse({
            error: err?.response?.data?.Error?.message ?? "Some error occurred!",
          });

          setGetTrainsResStatusObj({
            status: err?.response?.status ?? NaN,
            statusText: err?.response?.statusText ?? "",
          });
          break;

        case Constants.GET_LIVE_STATUS:
          if (err?.response?.status === 403)
            setLiveStatusResponse({
              error: "Auth triggered!",
              message: err?.response?.data?.message,
            });
          else
            setLiveStatusResponse({
              error: err?.response?.data?.Error?.message ?? "Some error occurred!",
            });

          setLiveStatusResStatusObj({
            status: err?.response?.status ?? NaN,
            statusText: err?.response?.statusText ?? "",
          });
          break;

        default:
          break;
      }
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
    resStatusObj: getTrainsResStatusObj,
  };

  const liveStatusCompProps: LiveStatusAPICompProps = {
    invalidFields,
    isLoaderRunning,
    handleChange,
    handleSubmit,
    apikey,
    response: liveStatusResponse ?? { message: "", live_status: [] }, // If live status response is null, pass a default param
    requestBody: getLiveStatusRequestBody,
    resStatusObj: liveStatusResStatusObj,
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