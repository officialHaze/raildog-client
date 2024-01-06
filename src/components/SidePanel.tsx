import { FaUserAstronaut } from "react-icons/fa6";

export default function SidePanel() {
  return (
    <div className="text-white bg-github-black-secondary h-full w-[15%] white-border-r">
      <div className="header h-[17%] py-6 px-6 flex flex-col items-center gap-2 white-border">
        <FaUserAstronaut className="text-4xl" />
        <h2>Moinak Dey</h2>
      </div>

      <div className="bg-github-black-primary h-[78%] overflow-auto">options</div>

      <div className="h-[5%]">Logout</div>
    </div>
  );
}
