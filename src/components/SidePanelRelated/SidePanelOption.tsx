import { useContext, useEffect, useMemo, useState } from "react";
import { SideOptionSelectCtx, SideOptionSelectState } from "../../pages/Dashboard";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import SidePanelSubOption from "./SidePanelSubOption";
import Constants from "../../classes/Constants";

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

  if (!optionSelectState) throw new Error("Side option select ctx is null");

  const { isSelected, setIsSelected } = optionSelectState;

  // Deselect any sub option when the side panel options are changed
  useEffect(() => {
    setIsSubOptSelected("");
    return () => setIsSubOptSelected("");
  }, [isSelected]);

  // If no sub option is selected then always keep the scroll at top
  useMemo(() => {
    !isSubOptSelected && window.scrollTo(0, 0);
  }, [isSubOptSelected]);

  return (
    <div>
      <div
        id={`${Constants.SIDE_PANEL}_OPTION`}
        className={`transition ease-in ${
          suboptions.length > 0 ? "px-4" : "px-6"
        } py-2 font-bold text-lg cursor-pointer flex items-center gap-1 ${
          isSelected === id && "bg-blue-500"
        }`}
        onClick={() => {
          setIsSelected(id);
        }}
      >
        {suboptions.length > 0 &&
          (!arrowDown ? (
            <IoMdArrowDropright
              id={`${Constants.SIDE_PANEL}_SUB_OPTION_ARROW_RIGHT`}
              className="text-xl"
              onClick={() => showArrowDown(true)}
            />
          ) : (
            <IoMdArrowDropdown
              id={`${Constants.SIDE_PANEL}_SUB_OPTION_ARROW_DOWN`}
              className="text-xl"
              onClick={() => showArrowDown(false)}
            />
          ))}
        {optionName}
      </div>

      <div className={`transition-all ${!arrowDown ? "h-0" : "h-fit"} overflow-hidden`}>
        {suboptions.map((suboption, i) => (
          <SidePanelSubOption
            key={i}
            subOptionName={suboption.name}
            id={suboption.id}
            parentId={id}
            isSelected={isSubOptSelected === suboption.id}
            setIsSelected={setIsSubOptSelected}
            setIsParentSelected={setIsSelected}
            reqMethod={suboption.reqMethod}
          />
        ))}
      </div>
    </div>
  );
}
