import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  CardTitle,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Box,
  CircularProgress,
  CardActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { setDeleteFromCart } from "../Store/productStore";

function Cart() {
  const dispatch = useDispatch();
  const { cartItem } = useSelector((state) => state.productStore);
  
  const onDelete = (product) => {
    dispatch(setDeleteFromCart(product));
  };
  const total = () => {
    return cartItem.reduce((acc, product) => {
      const productPrice = parseFloat(product.price);
      return acc + productPrice;
    }, 0);
  };
  return (
    <Box
      sx={{
        height: "70vh",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: "full", display: "flex", flexWrap: "wrap", gap: "16px" }}
      >
        {/* Left side: Order summary and checkout button */}
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            sx={{ color: "darkgreen" }}
          >
            The Items
          </Typography>
          {cartItem.map((item) => (
            <div key={item.id} style={{}}>
              <Card variant="outlined" sx={{ maxWidth: 600 }}>
                <CardContent>
                  {/* Display cart items (name, price) here */}
                  <Typography>{item.name}</Typography>
                  <Typography>{item.price}JOD</Typography>
                </CardContent>
                <IconButton
                  sx={{ color: "#f0564e" }}
                  onClick={() => onDelete(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            </div>
          ))}
        </Grid>

        {/* Right side: Cart items */}
        <Grid item xs={12} md={2}>
          <Card variant="outlined">
            <CardContent>
              {/* Display cart items (name, price) here */}
              <Typography>Order Summary</Typography>
              <Typography>{total()}JD</Typography>
            </CardContent>
            <CardActions>
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
                // loading={isLoading}
                // onClick={handleSubmit}
              >
                Checkout Now
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
