import APIKeysContent from "./APIKeysRelated/APIKeysContent";
import RaildogAPIContent from "./RaildogAPIRelated/RaildogAPIContent";

interface Props {
  selectedOpt: string;
}

const contentMap: any = {
  API_KEYS: <APIKeysContent />,
  RAILDOG_API: <RaildogAPIContent />,
};

export default function DashboardContent({ selectedOpt }: Props) {
  return <div className="h-full w-full text-white overflow-auto">{contentMap[selectedOpt]}</div>;
}
