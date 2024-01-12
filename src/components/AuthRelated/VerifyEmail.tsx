import { MdMarkEmailRead } from "react-icons/md";
import { useDisableTimer, useLoader } from "../../utils/customHooks";
import Handler from "../../classes/Handler";
import { useContext } from "react";
import { PopupContext } from "../../App";
import Loader from "../Loader/Loader";
import Constants from "../../classes/Constants";

interface Props {
  email?: string;
  username: string;
  isNotVerified?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VerifyEmail({ email, username, isNotVerified }: Props) {
  const { isDisabled, timer, startDisableTimer } = useDisableTimer(
    process.env.REACT_APP_DISABLE_TIMER_IN_SEC
      ? parseInt(process.env.REACT_APP_DISABLE_TIMER_IN_SEC)
      : 20
  );
  const { startLoader, endLoader, isRunning: isLoaderRunning } = useLoader();
  const setPopupDisplay = useContext(PopupContext);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const handler = new Handler(startLoader, endLoader, setPopupDisplay);
    await handler.handleResendVerifyEmail(username);

    startDisableTimer();
  };

  return (
    <div className="text-center">
      <div className="flex justify-center items-center py-4">
        <MdMarkEmailRead className="text-7xl text-green-400" />
      </div>
      <div>
        <p>
          A verification link has been sent to{" "}
          {email ? <span className="font-bold">{email}</span> : " your registered email id"}.
        </p>
        <p>Kindly verify your email to activate this account.</p>
      </div>
      <div className="py-8">
        <p>Didn't receive any email?</p>
        <button
          className={`mt-4 py-2 px-4 bg-raildog-blue w-[35%] ${
            !isDisabled && "hover:bg-blue-500"
          } rounded-md ${isDisabled && "opacity-50"}`}
          disabled={isDisabled || isLoaderRunning}
          onClick={handleClick}
        >
          {!isLoaderRunning ? "Resend Verification Link" : <Loader />}
        </button>
        {isDisabled && <p className="py-2">(Resend again in {timer})</p>}
      </div>
      <div className="text-center text-lg">
        Already verified?{" "}
        <span
          id={Constants.LOGIN_BTN}
          onClick={() => isNotVerified && isNotVerified(false)}
          className="cursor-pointer text-raildog-blue"
        >
          Login
        </span>
      </div>
    </div>
  );
}
