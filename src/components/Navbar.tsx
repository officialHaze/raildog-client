import LoginBtn from "./AuthRelated/LoginBtn";
import RegisterBtn from "./AuthRelated/RegisterBtn";
import RaildogLogo from "./RaildogLogo";

export default function Navbar() {
  return (
    <div className="px-6 md:px-10 py-4 white-border bg-github-black-secondary text-white flex items-center justify-between">
      <RaildogLogo />
      <div className="flex items-center justify-center gap-6">
        <LoginBtn />
        <RegisterBtn />
      </div>
    </div>
  );
}
