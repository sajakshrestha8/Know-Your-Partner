import { Outlet } from "react-router";
import LogIn from "../Components/Login/Login";
import { useState } from "react";

const ProtectedRoutes = () => {
  const [auth, setAuth] = useState<boolean>(false);

  return <>{auth ? <Outlet /> : <LogIn />} </>;
};
export default ProtectedRoutes;
