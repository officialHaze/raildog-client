import APIKeysContent from "./APIKeysContent";

interface Props {
  selectedOpt: string;
}

const contentMap: any = {
  API_KEYS: <APIKeysContent />,
};

export default function DashboardContent({ selectedOpt }: Props) {
  return <div className="h-full w-full text-white overflow-auto">{contentMap[selectedOpt]}</div>;
}
