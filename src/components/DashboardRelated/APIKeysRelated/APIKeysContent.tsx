import { useContext } from "react";
import Handler from "../../../classes/Handler";
import { AuthContext, PopupContext } from "../../../App";
import { useLoader } from "../../../utils/customHooks";
import Loader from "../../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import Fetcher from "../../../classes/Fetcher";
import replaceTokens from "../../../utils/AuthRelated/replaceTokens";
import logout from "../../../utils/AuthRelated/logout";
import APIKeySkeleton from "../../Decorations/APIKeySkeleton";
import APIKeyHolder from "./APIKeyHolder";

export default function APIKeysContent() {
  const setPopupDisplay = useContext(PopupContext);
  const setIsAuthenticated = useContext(AuthContext);
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();
  const apiKeysQuery = useQuery({
    queryKey: ["APIKeys"],
    queryFn: Fetcher.getApiKeys,
  });

  if (!setIsAuthenticated) throw new Error("Auth context value is null");

  if (apiKeysQuery.status === "error") {
    const handler = new Handler(startLoader, endLoader, setPopupDisplay);
    handler.handleError(apiKeysQuery.error, async (errStatus?: number) => {
      if (errStatus && errStatus === 401) {
        try {
          await replaceTokens();
          // Call the method again
          apiKeysQuery.refetch();
        } catch (err) {
          console.error(err);
          logout({ setIsAuthenticated });
        }
      }
    });
  }

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
        <div>
          {apiKeysQuery.status === "pending" && <APIKeySkeleton />}
          {apiKeysQuery.data?.api_keys.map(
            (apikeyObj: { _id: string; api_key: string; is_enabled: boolean }, i: number) => {
              return (
                <APIKeyHolder
                  key={apikeyObj._id}
                  _id={apikeyObj._id}
                  api_key={apikeyObj.api_key}
                  is_enabled={apikeyObj.is_enabled}
                />
              );
            }
          )}
        </div>
        <button
          className="py-2 px-4 my-4 w-[15%] bg-blue-500 rounded-lg hover:bg-blue-400"
          onClick={handleClick}
        >
          {!isLoaderRunning ? "Generate API Key" : <Loader />}
        </button>
      </div>
    </div>
  );
}
