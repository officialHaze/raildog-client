import Constants from "../classes/Constants";
import LoginModal from "./AuthRelated/LoginModal";
import RegisterModal from "./AuthRelated/RegisterModal";

interface Props {
  modalType: string;
  payload: any;
  className?: string;
}

// Modal mapping
const modalMap: any = {
  REGISTER_MODAL: <RegisterModal />,
  LOGIN_MODAL: <LoginModal />,
};

export default function Modal({ modalType, payload, className }: Props) {
  return (
    <div
      id={Constants.MODAL}
      className={`${className} px-4 py-4 h-screen w-screen bg-[#ffffff07] absolute top-0 flex items-start justify-center gap-4`}
    >
      {/* {modalType === ModalTypes.REGISTER_MODAL && <RegisterModal />} */}
      {modalMap[modalType]}
    </div>
  );
}
