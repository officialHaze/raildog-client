import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./classes/Routes";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App relative">
      <Navbar />
      <Routes>
        <Route path={AppRoutes.LANDING_PAGE} element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;

