import { HashLink } from "react-router-hash-link";
import AppRoutes from "../../classes/Routes";

interface Props {
  subOptionName: string;
  id: string;
  parentId: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  setIsParentSelected: React.Dispatch<React.SetStateAction<string>>;
  reqMethod?: string;
  //   suboptions: SidePanelSubOption[];
}

const reqMethodColorMap: any = {
  GET: "text-green-500",
  POST: "text-yellow-500",
};

export default function SidePanelSubOption({
  subOptionName,
  id,
  parentId,
  isSelected,
  setIsSelected,
  setIsParentSelected,
  reqMethod,
}: Props) {
  const handleSubOptClick = () => {
    setIsParentSelected(parentId);
    setIsSelected(id);
  };

  return (
    <div className="py-2 text-md">
      <HashLink
        smooth
        to={`${AppRoutes.DASHBOARD}#${id}`}
        className={`px-6 cursor-pointer flex items-center gap-2 ${isSelected && "text-blue-500"}`}
        onClick={handleSubOptClick}
      >
        {reqMethod && <p className={`${reqMethodColorMap[reqMethod]}`}>{reqMethod}</p>}
        {subOptionName}
      </HashLink>
    </div>
  );
}
