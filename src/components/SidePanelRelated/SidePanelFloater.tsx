import { useContext, useEffect } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { SlideInSidePanelCtx } from "../../pages/Dashboard";
import Constants from "../../classes/Constants";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function SidePanelFloater(props: Props) {
  const slideInSidePanelCtx = useContext(SlideInSidePanelCtx);

  if (!slideInSidePanelCtx) throw new Error("Slide in side panel ctx value not provided!");

  // Monitor and handle click event
  useEffect(() => {
    const handleClick = (e: any) => {
      const id: string | null = e.target.id || e.target.parentElement.id || null;
      if (id) {
        id === Constants.SIDE_PANEL_FLOATER
          ? slideInSidePanelCtx.toSlideInSidePanel(!slideInSidePanelCtx.slideInSidePanel)
          : id.includes("SIDE_PANEL") && slideInSidePanelCtx.toSlideInSidePanel(true);
      } else {
        slideInSidePanelCtx.toSlideInSidePanel(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [slideInSidePanelCtx]);

  return (
    <div
      id={Constants.SIDE_PANEL_FLOATER}
      className={`absolute lg:hidden py-6 rounded-r-lg bg-slate-500 ${props.className}`}
    >
      {!slideInSidePanelCtx.slideInSidePanel ? (
        <MdKeyboardArrowRight className="text-2xl" />
      ) : (
        <MdKeyboardArrowLeft className="text-2xl" />
      )}
    </div>
  );
}
