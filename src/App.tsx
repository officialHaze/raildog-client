import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./classes/Routes";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import React, { createContext, useEffect, useState } from "react";
import Constants, { ModalTypes } from "./classes/Constants";
import Modal from "./components/Modal";
import { usePopup } from "./utils/customHooks";
import Popup from "./components/Popup";

export const ModalContext = createContext<React.Dispatch<
  React.SetStateAction<{
    toDisplay: boolean;
    modalType: string;
    payload: null;
  }>
> | null>(null);

export const PopupContext = createContext<React.Dispatch<
  React.SetStateAction<{
    toDisplay: boolean;
    message: string;
    popupType: string;
  }>
> | null>(null);

function App() {
  const [displayModal, toDisplayModal] = useState({
    toDisplay: false,
    modalType: "",
    payload: null,
  });
  const [displayPopup, setPopupDisplay] = usePopup();

  // Handle clicks as a side effect
  useEffect(() => {
    const handleClick = (e: any) => {
      const id = e.target.id;

      switch (id) {
        case Constants.REGISTER_BTN:
          // Display the register modal
          toDisplayModal({
            toDisplay: true,
            modalType: ModalTypes.REGISTER_MODAL,
            payload: null,
          });
          break;

        case Constants.LOGIN_BTN:
          // Display the login modal
          toDisplayModal({
            toDisplay: true,
            modalType: ModalTypes.LOGIN_MODAL,
            payload: null,
          });
          break;

        case Constants.MODAL:
          toDisplayModal({
            toDisplay: false,
            modalType: "",
            payload: null,
          });
          break;

        default:
          break;
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <PopupContext.Provider value={setPopupDisplay}>
      <div className="App relative min-h-screen">
        {displayPopup.toDisplay && (
          <Popup message={displayPopup.message} popupType={displayPopup.popupType} />
        )}
        <ModalContext.Provider value={toDisplayModal}>
          <Modal
            className={`transition-all ${displayModal.toDisplay ? "scale-100" : "scale-0"}`}
            modalType={displayModal.modalType}
            payload={displayModal.payload}
          />
        </ModalContext.Provider>
        <Navbar />
        <Routes>
          <Route path={AppRoutes.LANDING_PAGE} element={<Landing />} />
        </Routes>
      </div>
    </PopupContext.Provider>
  );
}

export default App;

