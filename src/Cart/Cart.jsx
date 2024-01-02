import React , {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
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
import Swal from "sweetalert2"
import {craeteTransaction} from "../Home/services"
import { useRouter } from "next/router";
import {setEmptyCartItem} from "../Store/productStore"

function Cart() {
  const dispatch = useDispatch();
  const router = useRouter()
  const { cartItem } = useSelector((state) => state.productStore);
  
  const[loading, setLoading] = useState(false)

  const onDelete = (product) => {
    dispatch(setDeleteFromCart(product));
  };
  const total = () => {
    return cartItem.reduce((acc, product) => {
      const productPrice = parseFloat(product.price);
      return acc + productPrice;
    }, 0);
  };

  const handleSubmit = async () => {
   if(cartItem.length === 0) return Swal.fire('No Items Inside the cart')
   try {
    setLoading(true)
    const token = localStorage.getItem("token");
    const {id} = jwtDecode(token);
    const transactinDto = {
      totalAmount : total(),
      userId: id,
      products: cartItem
    }
    await craeteTransaction(transactinDto)
    setLoading(false)
    dispatch(setEmptyCartItem())
    Swal.fire('Paymet Completed Succssfully')
    router.push("/")
   } catch (error) {
    console.log(error);
   }finally {
    setLoading(false)
   }
  }
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
                loading={loading}
                onClick={handleSubmit}
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
