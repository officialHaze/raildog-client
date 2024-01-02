import { ReactNode } from "react";

interface Props {
  children: string | ReactNode;
  className: string;
  ref_: React.MutableRefObject<HTMLInputElement | null>;
}

export default function Label({ children, className, ref_ }: Props) {
  return (
    <div
      onClick={() => ref_?.current?.focus()}
      className={`absolute left-2 bg-[#191919] px-2 transition ${className}`}
    >
      {children}
    </div>
  );
}
