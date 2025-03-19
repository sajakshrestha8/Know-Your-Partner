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
import { useState } from "react";
import "./signup.css";
import { Link } from "react-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleLogin = () => {
    console.log("click vayo");
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
              //   onChange={handlEmailInput}
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
              //   onChange={handlEmailInput}
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
                // onChange={handlPasswordInput}
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
                // onChange={handlPasswordInput}
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
          <Button variant="contained" onClick={handleLogin}>
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
