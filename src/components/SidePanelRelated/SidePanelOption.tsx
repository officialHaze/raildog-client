import { useContext, useState } from "react";
import { SideOptionSelectCtx, SideOptionSelectState } from "../../pages/Dashboard";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import SidePanelSubOption from "./SidePanelSubOption";

interface SidePanelSubOptionData {
  name: string;
  reqMethod?: string;
  id: string;
}

interface Props {
  optionName: string;
  id: string;
  suboptions: SidePanelSubOptionData[];
}

export default function SidePanelOption({ optionName, id, suboptions }: Props) {
  const optionSelectState: SideOptionSelectState | null = useContext(SideOptionSelectCtx);
  const [arrowDown, showArrowDown] = useState(false);
  const [isSubOptSelected, setIsSubOptSelected] = useState("");

  if (!optionSelectState) throw new Error("Side option select state value is null");

  const { isSelected, setIsSelected } = optionSelectState;

  //   useMemo(() => {
  //     setIsSubOptSelected("");
  //   }, [isSelected]);

  return (
    <div>
      <div
        className={`transition ease-in ${
          suboptions.length > 0 ? "px-4" : "px-6"
        } py-2 font-bold text-lg cursor-pointer flex items-center gap-1 ${
          isSelected === id && "bg-blue-500"
        }`}
        onClick={() => setIsSelected(id)}
      >
        {suboptions.length > 0 &&
          (!arrowDown ? (
            <IoMdArrowDropright className="text-xl" onClick={() => showArrowDown(true)} />
          ) : (
            <IoMdArrowDropdown className="text-xl" onClick={() => showArrowDown(false)} />
          ))}
        {optionName}
      </div>

      <div className={`transition-all ${!arrowDown ? "h-0" : "h-fit"} overflow-hidden`}>
        {suboptions.map((suboption, i) => (
          <SidePanelSubOption
            key={i}
            subOptionName={suboption.name}
            id={suboption.id}
            isSelected={isSubOptSelected === suboption.id}
            setIsSelected={setIsSubOptSelected}
            reqMethod={suboption.reqMethod}
          />
        ))}
      </div>
    </div>
  );
}
