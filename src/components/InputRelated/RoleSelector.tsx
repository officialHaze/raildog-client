import { InputTypes } from "../../classes/Constants";

export default function RoleSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="py-2">
      <p>Choose your role:</p>
      <p className="mb-2 text-sm">
        <i>(This field is mandatory as it helps with the analytics)</i>
      </p>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-1">
          <input
            className="outline-none w-[20%]"
            type="radio"
            name="individual"
            id={InputTypes.INDIVIDUAL_ROLE}
            checked={value === "individual"}
            onChange={onChange}
          />
          <label htmlFor={InputTypes.INDIVIDUAL_ROLE}>
            <i className="">Individual</i>
          </label>
        </div>

        <div className="flex items-center gap-1">
          <input
            className="outline-none w-[20%]"
            type="radio"
            name="individual"
            id={InputTypes.DEVELOPER_ROLE}
            checked={value === "developer"}
            onChange={onChange}
          />
          <label htmlFor={InputTypes.DEVELOPER_ROLE}>
            <i className="">Developer</i>
          </label>
        </div>

        <div className="flex items-center gap-1">
          <input
            className="outline-none w-[20%]"
            type="radio"
            name="individual"
            id={InputTypes.BUSINESS_ROLE}
            checked={value === "business"}
            onChange={onChange}
          />
          <label htmlFor={InputTypes.BUSINESS_ROLE}>
            <i className="">Business</i>
          </label>
        </div>
      </div>
    </div>
  );
}
