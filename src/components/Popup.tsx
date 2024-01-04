import { PopupTypes } from "../classes/Constants";

interface Props {
  message: string;
  popupType: string;
}

export default function Popup({ message, popupType }: Props) {
  return (
    <div
      className={`z-20 absolute bottom-10 right-10 px-4 py-2 rounded-lg text-lg max-w-[70%] ${
        popupType === PopupTypes.ERROR_POPUP
          ? "bg-red-500 text-white font-semibold"
          : "bg-green-500 text-white font-semibold"
      }`}
    >
      {message}
    </div>
  );
}
