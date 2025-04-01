import { Outlet } from "react-router";
import LogIn from "../Components/Login/Login";
import { useState } from "react";

const ProtectedRoutes = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    setAuth(localStorage.getItem("token"));
  };

  window.addEventListener("storage", handleLogin);
  console.log(auth);

  return <>{auth ? <Outlet /> : <LogIn handleLogin={handleLogin} />} </>;
};
export default ProtectedRoutes;
