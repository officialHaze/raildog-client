import { createContext, useState } from "react";
import SidePanel from "../components/SidePanelRelated/SidePanel";
import { SidePanelOptionsId } from "../classes/Constants";
import DashboardContent from "../components/DashboardRelated/DashboardContent";

export interface SideOptionSelectState {
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const SideOptionSelectCtx = createContext<SideOptionSelectState | null>(null);

export default function Dashboard() {
  const [isSelected, setIsSelected] = useState(SidePanelOptionsId.API_KEYS); //By default the API keys option will be selected
  return (
    <div className="flex h-screen">
      <SideOptionSelectCtx.Provider value={{ isSelected, setIsSelected }}>
        <SidePanel className="hidden lg:block" />
        <DashboardContent selectedOpt={isSelected} />
      </SideOptionSelectCtx.Provider>
    </div>
  );
}
