import { MdMarkEmailRead } from "react-icons/md";
import { useDisableTimer } from "../../utils/customHooks";

interface Props {
  email: string;
}

export default function VerifyEmail({ email }: Props) {
  const { isDisabled, timer, startDisableTimer } = useDisableTimer(
    process.env.REACT_APP_DISABLE_TIMER_IN_SEC
      ? parseInt(process.env.REACT_APP_DISABLE_TIMER_IN_SEC)
      : 20
  );

  // useEffect(() => {
  //   startDisableTimer();
  // }, [startDisableTimer]);

  return (
    <div className="text-center">
      <div className="flex justify-center items-center py-4">
        <MdMarkEmailRead className="text-7xl text-green-400" />
      </div>
      <div>
        <p>
          A verification link has been sent to <span className="font-bold">{email}</span>.
        </p>
        <p>Kindly verify your email to activate this account.</p>
      </div>
      <div className="py-8">
        <p>Didn't receive any email?</p>
        <button
          className={`mt-4 py-2 px-4 bg-raildog-blue ${
            !isDisabled && "hover:bg-blue-500"
          } rounded-md ${isDisabled && "opacity-50"}`}
          disabled={isDisabled}
        >
          Resend Verification Link
        </button>
        {isDisabled && <p className="py-2">(Resend again in {timer})</p>}
      </div>
    </div>
  );
}
