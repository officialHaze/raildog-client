import { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { AuthContext } from "../../App";
import logout from "../../utils/AuthRelated/logout";
import { RiLogoutCircleLine } from "react-icons/ri";
import sidePanelOptions from "../../utils/SidePanelRelated/SidePanelOptions";
import SidePanelOption from "./SidePanelOption";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function SidePanel(props: Props) {
  const setIsAuthenticated = useContext(AuthContext);

  if (!setIsAuthenticated) throw new Error("Auth context value is null");

  return (
    <div
      className={`${props.className} text-white bg-github-black-secondary h-full w-[15%] white-border-r`}
    >
      <div className="header h-[17%] py-6 px-6 flex flex-col items-center gap-2 white-border">
        <FaUserAstronaut className="text-4xl" />
        <h2>Moinak Dey</h2>
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
