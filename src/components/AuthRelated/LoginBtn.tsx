import Constants from "../../classes/Constants";

export default function LoginBtn() {
  return (
    <div>
      <button id={Constants.LOGIN_BTN} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400">
        Login
      </button>
    </div>
  );
}
