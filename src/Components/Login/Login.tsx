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
import axios from "axios";
import * as API from "../../API/api";
import { Link } from "react-router";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = () => {
    axios
      .post(API.login, {
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
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
            <Link to={"/signUp"} className="signin">
              Sign In
            </Link>
          </label>
        </div>
      </div>
    </>
  );
};

export default LogIn;
