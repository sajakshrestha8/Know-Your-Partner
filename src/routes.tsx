import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import LogIn from "./Components/Login/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
