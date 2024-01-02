import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  styled,
  Grid,
  InputLabel,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { createProduct } from "../services";
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

function CreateProduct({ copyFullProducts, open, onClose, updateProducts }) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockQuantityError, seStockQuantityError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);


  const getValidation = () => {
    let flag = true;
    if (!name || name.trim("").length < 3 || name.trim("").length > 50) {
      flag = false;
      setNameError("Sorry, Name is required max 50 Character min 3 Character");
    } else setNameError("");
    if (!price || isNaN(+price) || +price < 0) {
      flag = false;
      setPriceError("Sorry, Price is required and should be positive number");
    } else setPriceError("");
    if (
      !stockQuantity ||
      isNaN(+stockQuantity) ||
      +stockQuantity < 0 ||
      !Number.isInteger(+stockQuantity)
    ) {
      flag = false;
      seStockQuantityError(
        "Sorry, stock Quantity is required and should be positive and integer number"
      );
    } else seStockQuantityError("");
    return flag;
  };

  const handleSave = async () => {
    const checkValidation = getValidation();
    if (!checkValidation) return;
    try {
      setLoading(true);
      const productDto = {
        name,
        price: +price,
        stockQuantity: +stockQuantity,
      };
      const response = await createProduct(productDto);
      console.log("response", response);
      updateProducts([...copyFullProducts, response]);

      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 2000);
      setSnackbar(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
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
          Create Product
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
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              <InputLabel htmlFor="name">product name</InputLabel>
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
            <Grid item xs={6} sx={{ marginTop: "5px" }}>
              <InputLabel htmlFor="name">product Price</InputLabel>
              <CustomTextField
                size="small"
                required
                autoFocus
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                error={priceError}
                helperText={priceError && priceError}
              />
            </Grid>
            <Grid item xs={6} sx={{ marginTop: "5px" }}>
              <InputLabel htmlFor="name">stock Quantity</InputLabel>
              <CustomTextField
                size="small"
                required
                autoFocus
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                fullWidth
                error={stockQuantityError}
                helperText={stockQuantityError && stockQuantityError}
              />
            </Grid>
          </Grid>
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
      {snackbar && (
        <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
           The Product has been Created!
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
export default CreateProduct;
