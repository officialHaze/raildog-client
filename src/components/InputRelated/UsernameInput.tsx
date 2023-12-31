import { AuthInputProps } from "./EmailInput";
import { InputTypes } from "../../classes/Constants";

export default function UsernameInput({ labelPos, onChange, value, ref_ }: AuthInputProps) {
  return (
    <div className="relative email flex items-center">
      <input onChange={onChange} value={value} id={InputTypes.USERNAME} type="text" ref={ref_} />
      <div
        onClick={() => ref_?.current?.focus()}
        className={`absolute left-2 bg-[#191919] px-2 transition ${labelPos.username}`}
      >
        Username*
      </div>
    </div>
  );
}
