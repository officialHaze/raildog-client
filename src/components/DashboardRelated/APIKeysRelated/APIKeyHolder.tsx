interface Props {
  _id: string;
  api_key: string;
  is_enabled: boolean;
}

export default function APIKeyHolder({ _id: id, api_key, is_enabled }: Props) {
  return (
    <div
      className={`font-['Dosis', sans-serif] py-2 px-4 w-[30%] bg-slate-600 my-6 rounded-lg ${
        !is_enabled && "opacity-40"
      }`}
    >
      {api_key}
    </div>
  );
}
