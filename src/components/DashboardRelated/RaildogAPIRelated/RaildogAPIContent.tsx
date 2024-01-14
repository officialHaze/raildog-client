import { useState } from "react";
import { SidePanelOptionsId } from "../../../classes/Constants";
import apidoc from "../../../json/api.doc.json";

export default function RaildogAPIContent() {
  const [apikey, setApikey] = useState("{API_KEY}");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: type, value } = e.currentTarget;

    switch (type) {
      case "API_KEY":
        setApikey(value);
        break;

      default:
        break;
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
        <p>Get list of trains for a given time period.</p>
        <div className="required-fields flex flex-col gap-8 py-6">
          <div className="flex w-full items-center gap-4">
            <p className="w-[10%]">API Endpoint: </p>
            <div>{`${process.env.REACT_APP_API_ENDPOINT}/api/get_trains?key=${apikey}`}</div>
          </div>

          <div className="flex w-full items-start gap-4">
            <p className="w-[10%]">API key: </p>
            <div className="w-[37%]">
              <input
                id="API_KEY"
                value={apikey.includes("{") ? "" : apikey}
                onChange={handleChange}
                autoComplete="off"
              />
              <em className="text-sm">*Required</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
