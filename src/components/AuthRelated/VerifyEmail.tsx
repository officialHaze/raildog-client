import { MdMarkEmailRead } from "react-icons/md";

interface Props {
  email: string;
}

export default function VerifyEmail({ email }: Props) {
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
    </div>
  );
}
