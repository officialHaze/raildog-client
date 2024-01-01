import React, { ReactNode } from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnDisplayText: string | ReactNode;
  isDisabled: boolean;
}

export default function SubmitBtn({ btnDisplayText, onClick, isDisabled }: Props) {
  return (
    <div className="text-center py-4">
      <button
        className="px-6 py-2 w-[25%] bg-raildog-blue hover:bg-blue-500 rounded-md"
        onClick={!onClick ? () => {} : onClick}
        type="submit"
        disabled={isDisabled}
      >
        {btnDisplayText}
      </button>
    </div>
  );
}
