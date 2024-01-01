import React, { useState } from "react";

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
} from "@mui/material";
import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);

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
    if (!isRememberMeChecked) {
      const savedCredentials = JSON.stringify({
        email: email,
        password: password,
        isRememberMeChecked: !isRememberMeChecked,
      });
      localStorage.setItem("savedCredentials", savedCredentials);
    } else {
      localStorage.removeItem("savedCredentials");
    }
  };
  const handleSubmit = () => {
    console.log("dd");
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
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
              <LoadingButton
                type="submit"
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
                  console.log("l");
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
    </div>
  );
}

export default Login;
