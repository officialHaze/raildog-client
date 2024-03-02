import { createContext, useState } from "react";
import SidePanel from "../components/SidePanelRelated/SidePanel";
import { SidePanelOptionsId } from "../classes/Constants";
import DashboardContent from "../components/DashboardRelated/DashboardContent";

export interface SideOptionSelectState {
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
}

export interface SlideInSidePanelStateOptions {
  slideInSidePanel: boolean;
  toSlideInSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideOptionSelectCtx = createContext<SideOptionSelectState | null>(null);
export const SlideInSidePanelCtx = createContext<SlideInSidePanelStateOptions | null>(null);

export default function Dashboard() {
  const [isSelected, setIsSelected] = useState(SidePanelOptionsId.API_KEYS); //By default the API keys option will be selected
  const [slideInSidePanel, toSlideInSidePanel] = useState(false);
  return (
    <div className="relative flex items-center h-screen">
      <SideOptionSelectCtx.Provider value={{ isSelected, setIsSelected }}>
        <SlideInSidePanelCtx.Provider value={{ slideInSidePanel, toSlideInSidePanel }}>
          <SidePanel
            className={`absolute w-[50%] sm:w-[40%] md:w-[30%] lg:w-[25%] xl:w-[15%] transition-all ${
              !slideInSidePanel ? "-translate-x-[100%]" : "translate-x-0"
            } lg:block lg:relative lg:translate-x-0 z-10`}
          />
        </SlideInSidePanelCtx.Provider>
        <DashboardContent selectedOpt={isSelected} />
      </SideOptionSelectCtx.Provider>
    </div>
  );
}
