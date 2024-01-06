import { useContext } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { AuthContext } from "../App";
import logout from "../utils/AuthRelated/logout";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function SidePanel() {
  const setIsAuthenticated = useContext(AuthContext);

  if (!setIsAuthenticated) throw new Error("Auth context value is null");

  return (
    <div className="text-white bg-github-black-secondary h-full w-[15%] white-border-r">
      <div className="header h-[17%] py-6 px-6 flex flex-col items-center gap-2 white-border">
        <FaUserAstronaut className="text-4xl" />
        <h2>Moinak Dey</h2>
      </div>

      <div className="bg-github-black-primary px-6 py-6 h-[75%] overflow-auto">options</div>

      <div className="h-[8%] px-4 py-4">
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
