import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import "./signup.css";
import { Link } from "react-router";
import axios from "axios";
import * as API from "../../API/api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSignUp = () => {
    axios
      .post(API.signUp, {
        fullName: name,
        email: email,
        password: password,
        confirmPassword: confirmPass,
      })
      .then((res) => res.data.message)
      .catch((err) => console.log(err));
  };

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(event.target.value);
  };
  return (
    <>
      <div className="mainWrapper">
        <div className="signupWrapper">
          <label className="topic">Welcome to Know-Your-Partner</label>
          <label className="heading">Sign Up</label>
          <div className="inputFeildWrapper">
            <label className="inputHeading">Enter your Full Name</label>
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              onChange={handleNameInput}
            />
          </div>
          <div className="inputFeildWrapper">
            <label className="inputHeading">
              Enter your username or email address
            </label>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={handleEmailInput}
            />
          </div>
          <div>
            <label className="inputHeading">Enter your Password</label>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={handlePasswordInput}
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
          </div>
          <div className="inputFeildWrapper">
            <label className="inputHeading">Confirm your Password</label>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleConfirmPasswordInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>
          <Button variant="contained" onClick={handleSignUp}>
            Sign Up
          </Button>
          <label className="signinOption">
            Already have an account?
            <Link to={"/login"} className="signin">
              Login
            </Link>
          </label>
        </div>
      </div>
    </>
  );
};

export default Signup;
