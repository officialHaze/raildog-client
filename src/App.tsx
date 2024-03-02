import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes from "./classes/Routes";
import Landing from "./pages/Landing";
// import Navbar from "./components/Navbar";
import React, { createContext, useEffect, useState } from "react";
import Constants, { ModalTypes } from "./classes/Constants";
import Modal from "./components/Modal";
import { usePopup } from "./utils/customHooks";
import Popup from "./components/Popup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Cache from "./classes/Cache";

const queryClient = new QueryClient();

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

export const AuthContext = createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(
  null
);

// Check cache for the access token to keep the user authenticated
const isAccessTokenPresent = () => {
  const accessTokenCookie = Cache.getCookie({ cname: Constants.ACCESS_TOKEN });

  return accessTokenCookie ? true : false;
};

function App() {
  const [displayModal, toDisplayModal] = useState({
    toDisplay: false,
    modalType: "",
    payload: null,
  });
  const [displayPopup, setPopupDisplay] = usePopup();
  const [isAuthenticated, setIsAuthenticated] = useState(isAccessTokenPresent());

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

        case Constants.FORGOT_PASSWORD:
          toDisplayModal({
            toDisplay: true,
            modalType: ModalTypes.RESET_PASS_MODAL,
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
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={setIsAuthenticated}>
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
            {/* <Navbar /> */}
            <Routes>
              <Route
                path={AppRoutes.LANDING_PAGE}
                element={!isAuthenticated ? <Landing /> : <Navigate to={AppRoutes.DASHBOARD} />}
              />
              <Route
                path={AppRoutes.DASHBOARD}
                element={isAuthenticated ? <Dashboard /> : <Navigate to={AppRoutes.LANDING_PAGE} />}
              />
            </Routes>
          </div>
        </PopupContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
