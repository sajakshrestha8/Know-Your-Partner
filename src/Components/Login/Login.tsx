import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "./login.css";
import { ChangeEvent, useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import axios, { AxiosError } from "axios";
import * as API from "../../API/api";
import { Link, useNavigate } from "react-router";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(API.login, {
        email: email,
        password: password,
      });
      console.log(res.data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      if (res.statusText === "OK") {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          setErrorMessage(error.response?.data.messege);
        }
        console.log(error);
      }
    }
  };

  const handlEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="mainWrapper">
        <div className="loginWrapper">
          {errorMessage && <div className="errorMsg">! {errorMessage} !</div>}
          <label className="topic">Welcome to Know-Your-Partner</label>
          <label className="heading">Log In</label>
          <div className="inputFeildWrapper">
            <label className="inputHeading">
              Enter your username or email address
            </label>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={handlEmailInput}
            />
          </div>
          <div className="inputFeildWrapper">
            <label className="inputHeading">Enter your Password</label>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={handlPasswordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <div className="forgetPass">
              <label>Forget Password?</label>
            </div>
          </div>
          <Button variant="contained" onClick={handleLogin}>
            LogIn
          </Button>
          <label className="signinOption">
            Don't have and account?
            <Link to={"/signup"} className="signin">
              Sign In
            </Link>
          </label>
        </div>
      </div>
    </>
  );
};

export default LogIn;
