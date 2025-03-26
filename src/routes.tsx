import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import LogIn from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import ProtectedRoutes from "./Utils/protectedRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
