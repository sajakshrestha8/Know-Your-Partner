import { TextField } from "@mui/material";
import "./login.css";

const LogIn = () => {
  return (
    <>
      <div className="loginWrapper">
        <TextField id="standard-basic" label="UserName" variant="standard" />
        <TextField id="standard-basic" label="Password" variant="standard" />
      </div>
    </>
  );
};

export default LogIn;
