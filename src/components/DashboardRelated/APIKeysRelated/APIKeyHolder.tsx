import { useContext, useState } from "react";
import { AuthContext, PopupContext } from "../../../App";
import { PopupTypes } from "../../../classes/Constants";
import { FaCopy } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { useLoader } from "../../../utils/customHooks";
import Handler from "../../../classes/Handler";

interface Props {
  _id: string;
  api_key: string;
  is_enabled: boolean;
}

export default function APIKeyHolder({ _id: id, api_key, is_enabled }: Props) {
  const setPopupDisplay = useContext(PopupContext);
  const setIsAuthenticated = useContext(AuthContext);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();
  const [isEnabled, setIsEnabled] = useState(is_enabled);

  if (!setPopupDisplay) throw new Error("SetPopupDisplay context value is null!");
  if (!setIsAuthenticated) throw new Error("setIsAuthenticated context value is null!");

  const copyAPIKey = () => {
    navigator.clipboard.writeText(api_key);
    setPopupDisplay({
      toDisplay: true,
      message: "Copied to clipboard!",
      popupType: PopupTypes.SUCCESS_POPUP,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    const handler = new Handler(startLoader, endLoader, setPopupDisplay);

    switch (id) {
      case "TOGGLE":
        handleToggle(handler);
        break;

      case "DELETE":
        deleteAPIKey(handler);
        break;

      default:
        break;
    }
  };

  const handleToggle = (handler: Handler) => {
    const update_type = isEnabled ? "disable" : "enable";
    const api_key_ids = [id];

    handler.handleAPIKeyUpdate({
      update_type,
      api_key_ids,
      setIsAuthenticated,
      setIsEnabled: setIsEnabled,
    });
  };

  const deleteAPIKey = (handler: Handler) => {
    const api_key_ids = [id];
    handler.handleAPIKeyDelete({ api_key_ids, setIsAuthenticated });
  };

  return (
    <div
      className={`font-['Dosis', sans-serif] py-2 px-4 w-[34%] bg-slate-600 my-6 rounded-lg flex items-center justify-between ${
        !isEnabled && "opacity-40"
      }`}
    >
      <p>{api_key}</p>
      <div className="flex items-center gap-4">
        <FaCopy className="cursor-pointer" onClick={copyAPIKey} />
        {!isLoaderRunning && (
          <FaPowerOff
            id="TOGGLE"
            className={`cursor-pointer ${isEnabled ? "text-green-500" : "text-red-500"}`}
            onClick={handleClick}
          />
        )}
        {!isLoaderRunning && (
          <AiFillDelete
            id="DELETE"
            onClick={handleClick}
            className="text-lg cursor-pointer text-[#FF8989]"
          />
        )}
      </div>
    </div>
  );
}
