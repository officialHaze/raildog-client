import { createContext, useState } from "react";
import SidePanel from "../components/SidePanelRelated/SidePanel";
import { SidePanelOptionsId } from "../classes/Constants";

export interface SideOptionSelectState {
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const SideOptionSelectCtx = createContext<SideOptionSelectState | null>(null);

export default function Dashboard() {
  const [isSelected, setIsSelected] = useState(SidePanelOptionsId.API_KEYS); //By default the API keys option will be selected
  return (
    <div className="flex gap-10 h-screen">
      <SideOptionSelectCtx.Provider value={{ isSelected, setIsSelected }}>
        <SidePanel />
      </SideOptionSelectCtx.Provider>
      <div className="h-full w-full text-white">Dashboard cards</div>
    </div>
  );
}
