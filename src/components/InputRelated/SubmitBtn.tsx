import React from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  btnDisplayText: string;
}

export default function SubmitBtn({ btnDisplayText, onClick }: Props) {
  return (
    <div className="text-center py-4">
      <button
        className="px-6 py-2 bg-raildog-blue hover:bg-blue-500 rounded-md"
        onClick={!onClick ? () => {} : onClick}
        type="submit"
      >
        {btnDisplayText}
      </button>
    </div>
  );
}
