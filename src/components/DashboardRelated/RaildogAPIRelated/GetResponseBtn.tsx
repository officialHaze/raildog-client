import React from "react";
import Loader from "../../Loader/Loader";

interface Props extends React.HTMLAttributes<HTMLElement> {
  isLoaderRunning: boolean;
}

export default function GetResponseBtn(props: Props) {
  return (
    <div className="py-4">
      <button
        type="submit"
        className="py-2 px-4 bg-blue-500 hover:bg-blue-400 rounded-md w-[40%] xl:w-[35%] md:w-[25%] sm:w-[30%]"
      >
        {props.isLoaderRunning ? <Loader /> : "Get Response"}
      </button>
    </div>
  );
}
