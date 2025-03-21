import { Outlet } from "react-router";
import LogIn from "../Components/Login/Login";

const ProtectedRoutes = () => {
  const auth = { token: false };

  return <>{auth.token ? <Outlet /> : <LogIn />} </>;
};
export default ProtectedRoutes;
