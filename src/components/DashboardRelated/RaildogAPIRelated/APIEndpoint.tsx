import React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  apikey: string;
}

export default function APIEndpoint(props: Props) {
  return (
    <div className="flex flex-col xl:flex-row w-full items-start xl:items-center py-4 gap-2">
      <p className="w-full xl:w-[10%]">API Endpoint: </p>
      <div>
        <em className="font-bold">{`${process.env.REACT_APP_API_ENDPOINT}/api/get_trains?key=${props.apikey}`}</em>
      </div>
    </div>
  );
}
