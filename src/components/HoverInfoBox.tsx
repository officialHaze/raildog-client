import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  body: ReactNode | string;
}

export default function HoverInfoBox(props: Props) {
  return (
    <div
      className={`absolute bg-yellow-500 text-black rounded-md py-1 px-4 transition-all ${props.className}`}
    >
      {props.body}
    </div>
  );
}
