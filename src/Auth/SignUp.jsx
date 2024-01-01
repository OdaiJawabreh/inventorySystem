import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContentText,
  DialogContent,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  FormControl,
  Radio,
  InputLabel,
  styled,
  TextField,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { creteNewUser } from "./services";
import Alert from '@mui/material/Alert';
const CustomTextField = styled(TextField)({
  backgroundColor: "#fafafa",
});
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f0564e",
  borderRadius: "0px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#d83c32", // You can change this to match the hover color if needed.
  },
}));

function SignUp({
  open,
  onClose,
  role,
  setRole,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };
  const getValidation = () => {
    let flag = true;
    if (!name || name.trim("").length < 3 || name.trim("").length > 50) {
      flag = false;
      setNameError("Sorry, Name is required max 50 Character min 3 Character");
    } else setNameError("");

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
  const handleSave = async () => {
    const checkValidation = getValidation();
    if (!checkValidation) return;
    setLoading(true);
    try {
      const userDto = { name, password, email, role };
      const response = await creteNewUser(userDto);
      console.log(response);
      setError("");

      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" sx={{ fontSize: "20px" }}>
          Create User
          <IconButton
            size="large"
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#d83c32",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true}>
            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
            <RadioGroup
              row
              onChange={handleRadioChange}
              value={role}
              defaultValue="member"
            >
              {["member", "admin"].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Grid item xs={11} sx={{ marginTop: "30px" }}>
            <InputLabel htmlFor="name">full name</InputLabel>
            <CustomTextField
              size="small"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              error={nameError}
              helperText={nameError && nameError}
            />
          </Grid>

          <Grid item xs={11} sx={{ marginTop: "15px" }}>
            <InputLabel htmlFor="email">email adress</InputLabel>
            <CustomTextField
              size="small"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              error={emailError}
              helperText={emailError && emailError}
            />
          </Grid>
          <Grid item xs={11} sx={{ marginTop: "15px" }}>
            <InputLabel htmlFor="email">Password min 7 charecter</InputLabel>
            <CustomTextField
              size="small"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              error={passwordError}
              helperText={passwordError && passwordError}
            />
          </Grid>
          {true && (
            <Alert variant="filled" severity="error" sx={{ marginTop: "15px" }}>
              {error}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
            >
              Creating...
            </LoadingButton>
          ) : (
            <CustomButton
              onClick={handleSave}
              variant="contained"
              size="large"
              loading={true}
            >
              Create
            </CustomButton>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignUp;
