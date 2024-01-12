interface Props {
  subOptionName: string;
  id: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  reqMethod?: string;
  //   suboptions: SidePanelSubOption[];
}

const reqMethodColorMap: any = {
  GET: "text-green-500",
};

export default function SidePanelSubOption({
  subOptionName,
  id,
  isSelected,
  setIsSelected,
  reqMethod,
}: Props) {
  return (
    <div className="py-2 text-md">
      <label
        className={`px-6 cursor-pointer flex items-center gap-2 ${isSelected && "text-blue-500"}`}
        onClick={() => setIsSelected(id)}
      >
        {reqMethod && <p className={`${reqMethodColorMap[reqMethod]}`}>{reqMethod}</p>}
        {subOptionName}
      </label>
    </div>
  );
}
