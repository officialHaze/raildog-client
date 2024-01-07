import { useContext } from "react";
import Handler from "../../classes/Handler";
import { AuthContext, PopupContext } from "../../App";
import { useLoader } from "../../utils/customHooks";

export default function APIKeysContent() {
  const setPopupDisplay = useContext(PopupContext);
  const setIsAuthenticated = useContext(AuthContext);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();

  if (!setIsAuthenticated) throw new Error("Auth context value is null");

  const handleClick = async () => {
    const handler = new Handler(startLoader, endLoader, setPopupDisplay);
    await handler.handleAPIKeyGeneration(setIsAuthenticated);
  };

  return (
    <div className="px-14 py-8">
      <div className="header px-4 py-4 white-border">
        <h1>API Keys</h1>
      </div>
      <div className="para text-lg px-4 py-4">
        <p>
          You need an API key to make requests and get train related status. Raildog allows you to
          generate a maximum of 4 API Keys per account which you can enable or disable as per your
          choice.
        </p>
      </div>
      <div className="sub-header px-4 py-4">
        <h2>Generated keys:</h2>
        <button onClick={handleClick}>Generate API Key</button>
      </div>
    </div>
  );
}
