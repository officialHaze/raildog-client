import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./classes/Routes";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import React, { createContext, useEffect, useState } from "react";
import Constants, { ModalTypes } from "./classes/Constants";
import Modal from "./components/Modal";

export const ModalContext = createContext<React.Dispatch<
  React.SetStateAction<{
    toDisplay: boolean;
    modalType: string;
    payload: null;
  }>
> | null>(null);

function App() {
  const [displayModal, toDisplayModal] = useState({
    toDisplay: false,
    modalType: "",
    payload: null,
  });

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
    <div className="App relative">
      {/* {displayModal.toDisplay && ( */}
      <ModalContext.Provider value={toDisplayModal}>
        <Modal
          className={`transition-all ${displayModal.toDisplay ? "scale-100" : "scale-0"}`}
          modalType={displayModal.modalType}
          payload={displayModal.payload}
        />
      </ModalContext.Provider>
      {/* )} */}
      <Navbar />
      <Routes>
        <Route path={AppRoutes.LANDING_PAGE} element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;

