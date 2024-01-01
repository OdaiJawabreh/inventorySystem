import React, { useState, useEffect } from "react";

import {
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import SignUp from "./SignUp";
import { login } from "./services";
import { useRouter } from "next/router";


function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [role, setRole] = useState("member");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);
  };
  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
  };
  const rememberMe = () => {
    setIsRememberMeChecked(!isRememberMeChecked);
  };
  const getValidation = () => {
    let flag = true;
    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      flag = false;
      setEmailError("Sorry, email is required, And should be valid");
    } else setEmailError("");
    if (!password.trim("") || password.trim("").length < 7) {
      flag = false;
      setPasswordError("Sorry, passord is required And at least 7 charecter");
    } else setPasswordError("");
    return flag;
  };
  const handleSubmit = async () => {
    const validation = getValidation();
    if (!validation) return;
    try {
      setIsLoading(true);
      const loginDto = { email, password };
      const {accessToken} = await login(loginDto);
      localStorage.setItem("token", JSON.stringify(accessToken));
      router.push('/')
      setError("");
      if (isRememberMeChecked) {
        const savedCredentials = JSON.stringify({
          email: email,
          password: isRememberMeChecked ? password : "",
          isRememberMeChecked: isRememberMeChecked,
        });
        localStorage.setItem("savedCredentials", savedCredentials);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onClose = () => setOpen(false);

  useEffect(() => {
    const savedCredentials = JSON.parse(
      localStorage.getItem("savedCredentials")
    );
    if (savedCredentials && savedCredentials.isRememberMeChecked) {
      setEmail(savedCredentials.email);
      setPassword(savedCredentials.password);
      setIsRememberMeChecked(savedCredentials.isRememberMeChecked);
    }
  }, []);
  return (
    <div
      style={{
        backgroundImage:
          'url("https://media.licdn.com/dms/image/D4D22AQFJlxd9JiLi6w/feedshare-shrink_1280/0/1692604721762?e=1706745600&v=beta&t=zp4Rdn6HNymfp4nFqKy8yKyrREtqG1_HGyXdrgu1NGA")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5%",
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Welcome To NARDPOS Inventory
              </Typography>
            </Grid>
          </Grid>
          <Box component="form" noValidate sx={{ mt: 1, width: "90%" }}>
            <Stack spacing={2}>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Email
                </Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete={email}
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError && emailError}
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {email && (
                          <IconButton
                            edge="end"
                            onClick={() => {
                              setEmail("");
                            }}
                          >
                            <Clear />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Password
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete={password}
                  value={password}
                  onChange={handlePasswordChange}
                  error={passwordError}
                  helperText={passwordError && passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setShowPassword(
                              (prevShowPassword) => !prevShowPassword
                            );
                          }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={5}>
                <Grid item>
                  <FormControlLabel
                    onClick={rememberMe}
                    control={
                      <Checkbox
                        size="small"
                        value="remember"
                        color="default"
                        sx={{
                          mr: -0.7,
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.4,
                        }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              {error && (
                <Alert
                  variant="filled"
                  severity="error"
                  sx={{ marginTop: "15px" }}
                >
                  {error}
                </Alert>
              )}
              <LoadingButton
                size="large"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  mt: 3,
                  mb: 2,
                  width: "100%",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "gray",
                  },
                }}
                loading={isLoading}
                onClick={handleSubmit}
              >
                Sign In
              </LoadingButton>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  mb: 2,
                  color: "gray",
                }}
              >
                or
              </Typography>
              {/* Create a new button for creating a new account */}
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  setName("");
                  setPassword("");
                  setEmail("");
                  setOpen(true);
                }}
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "green",
                  "&:hover": {
                    backgroundColor: "darkgreen",
                  },
                }}
              >
                Create New Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      {open && (
        <SignUp
          open={open}
          onClose={onClose}
          role={role}
          setRole={setRole}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
}

export default Login;
