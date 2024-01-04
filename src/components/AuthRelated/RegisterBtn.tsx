import Constants from "../../classes/Constants";

export default function RegisterBtn() {
  return (
    <div>
      <button
        id={Constants.REGISTER_BTN}
        className="bg-[#1640D6] hover:bg-blue-500 px-6 py-2 rounded-lg"
      >
        Register
      </button>
    </div>
  );
}
