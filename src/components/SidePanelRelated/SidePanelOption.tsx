import { useContext } from "react";
import { SideOptionSelectCtx, SideOptionSelectState } from "../../pages/Dashboard";

interface Props {
  optionName: string;
  id: string;
}

export default function SidePanelOption({ optionName, id }: Props) {
  const optionSelectState: SideOptionSelectState | null = useContext(SideOptionSelectCtx);

  if (!optionSelectState) throw new Error("Side option select state value is null");

  const { isSelected, setIsSelected } = optionSelectState;

  return (
    <div
      className={`px-6 py-2 font-bold text-lg cursor-pointer ${isSelected === id && "bg-blue-500"}`}
      onClick={() => setIsSelected(id)}
    >
      {optionName}
    </div>
  );
}
