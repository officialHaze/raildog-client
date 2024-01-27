import { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { AuthContext } from "../../App";
import logout from "../../utils/AuthRelated/logout";
import { RiLogoutCircleLine } from "react-icons/ri";
import sidePanelOptions from "../../utils/SidePanelRelated/SidePanelOptions";
import SidePanelOption from "./SidePanelOption";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Fetcher from "../../classes/Fetcher";
import UserDetails from "../../interfaces/UserDetails";
import UsernameSkeleton from "../Decorations/UsernameSkeleton";
import truncateText from "../../utils/truncate";
import { useHoverInfoBox } from "../../utils/customHooks";
import HoverInfoBox from "../HoverInfoBox";
import SidePanelFloater from "./SidePanelFloater";
import Constants from "../../classes/Constants";

interface Props extends React.HTMLAttributes<HTMLElement> {}

interface UserDetailsResponse {
  message: string;
  user_details: UserDetails;
}

const isQueryStatusPending = (query: UseQueryResult<UserDetailsResponse, Error>) =>
  query.status === "pending";
// const isQueryFailed = (query: UseQueryResult<UserDetailsResponse, Error>) =>
//   query.status === "error";
// const isQuerySuccess = (query: UseQueryResult<UserDetailsResponse, Error>) =>
//   query.status === "success";

const getUsername = (query: UseQueryResult<UserDetailsResponse, Error>) =>
  query.data?.user_details.username || "";

const isTextMoreThanMaxLen = (text: string, maxLen: number) => text.length > maxLen;

export default function SidePanel(props: Props) {
  const setIsAuthenticated = useContext(AuthContext);
  const userDetailsQuery = useQuery<UserDetailsResponse, Error>({
    queryKey: ["user-details"],
    queryFn: Fetcher.fetchUserDetails,
  });
  const { displayHoverInfoBox, hoverInfoBody, setHoverInfoStatus } = useHoverInfoBox();

  if (!setIsAuthenticated) throw new Error("Auth context value is null");

  return (
    <div
      id={Constants.SIDE_PANEL}
      className={`${props.className} text-white bg-github-black-secondary h-full white-border-r`}
    >
      {isTextMoreThanMaxLen(getUsername(userDetailsQuery), 9) && (
        <HoverInfoBox
          body={hoverInfoBody}
          className={`top-[6.5rem] left-4 ${displayHoverInfoBox ? "scale-100" : "scale-0"}`}
        />
      )}
      <SidePanelFloater className="-right-6 top-44" />
      <div className="header h-[17%] py-6 px-2 flex flex-col items-center gap-2 white-border">
        <FaUserAstronaut className="text-4xl" />
        <h2
          className="cursor-default relative"
          onMouseOver={() =>
            setHoverInfoStatus({
              toDisplayHoverInfo: true,
              infoBody: getUsername(userDetailsQuery),
            })
          }
          onMouseLeave={() => setHoverInfoStatus({ toDisplayHoverInfo: false, infoBody: "" })}
        >
          {truncateText(getUsername(userDetailsQuery))}
        </h2>
        {isQueryStatusPending(userDetailsQuery) && <UsernameSkeleton />}
      </div>

      <div className="bg-github-black-primary py-4 h-[75%] overflow-auto flex flex-col gap-4">
        {sidePanelOptions.map(option => (
          <SidePanelOption
            key={option.id}
            optionName={option.name}
            id={option.id}
            suboptions={option.suboptions}
          />
        ))}
      </div>

      <div className="h-[8%] px-4 py-4 white-border-t">
        <div
          className="flex items-center gap-2 text-xl cursor-pointer text-slate-500"
          onClick={() => logout({ setIsAuthenticated })}
        >
          <RiLogoutCircleLine className="text-2xl" />
          Logout
        </div>
      </div>
    </div>
  );
}
