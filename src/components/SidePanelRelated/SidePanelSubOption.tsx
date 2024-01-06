interface Props {
  subOptionName: string;
  id: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  //   suboptions: SidePanelSubOption[];
}

export default function SidePanelSubOption({
  subOptionName,
  id,
  isSelected,
  setIsSelected,
}: Props) {
  return (
    <div className="py-2 text-md">
      <div
        className={`px-14 cursor-pointer ${isSelected && "text-blue-500"}`}
        onClick={() => setIsSelected(id)}
      >
        {subOptionName}
      </div>
    </div>
  );
}
