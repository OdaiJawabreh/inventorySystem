import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateProduct from "../Update/UpdateProduct";
import { deleteProduct } from "../services";
import Swal from "sweetalert2";
import {  useDispatch } from "react-redux";
import { setCartItem } from "../../Store/productStore";
import jwtDecode from 'jwt-decode';

function TableView({ products, updateProducts, copyFullProducts, onAddCart }) {
  const token = localStorage.getItem("token");
  const {role} = jwtDecode(token);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const onClose = () => {
    setOpen(false);
  };

  const handleUpdate = (product) => {
    setData(product);
    setOpen(true);
  };

  const handleDelete = async (product) => {
    const confirm = await Swal.fire({
      title: `Are you sure to Delete Product ${product.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    });
    if (confirm.isConfirmed) {
      await deleteProduct(product.id);
      const newProuts = copyFullProducts.filter((el) => el.id !== product.id);
      updateProducts(newProuts);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(setCartItem(product))
    const updateStock = {
      ...product,
      stockQuantity : product.stockQuantity -1 
    }
    const products = copyFullProducts.map((el)=>{
      if(el.id === product.id) return updateStock
      else return el
    })
    updateProducts(products)
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "20px",
        marginTop: "50px",
      }}
    >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {products.length ? (
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table
              sx={{ minWidth: 650, backgroundColor: "#FFFF" }}
              aria-label="simple table"
            >
              <TableHead
                sx={{
                  backgroundColor: "#FFFF",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    Stock Quantity
                  </TableCell>
                  <TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    Add To Cart
                  </TableCell>
                  {role==='adin'&&<TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    Edit
                  </TableCell>}
                  {role== 'admin'&&<TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    delete
                  </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((product, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "#ccc",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        sx={{
                          color: "black",
                          fontSize: "13px",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                      >
                        {product.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "black",
                          fontSize: "13px",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                      >
                        {product.price}JD
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "black",
                          fontSize: "13px",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                      >
                        {product.stockQuantity}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: "#194569",
                          cursor: "pointer",
                          color: "black",
                          fontSize: "13px",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                        align="left"
                      >
                        <Button
                          sx={{
                            color: "green",
                            textTransform: "capitalize",
                            borderColor: "#222656",
                          }}
                          variant="outlined"
                          onClick={() => {
                            handleAddToCart(product);
                          }}
                          disabled={product.stockQuantity < 1}
                        >
                          <AddShoppingCartIcon />{" "}
                          {product.stockQuantity < 1
                            ? "Out Of Stock"
                            : "Add to Cart"}
                        </Button>
                      </TableCell>

                      {role === 'admin' && <TableCell
                        sx={{
                          color: "#194569",
                          cursor: "pointer",
                          color: "black",
                          fontSize: "13px",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                        align="left"
                      >
                        <IconButton
                          sx={{ color: "#222656" }}
                          onClick={() => handleUpdate(product)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>}

                      {role === 'admin'&&<TableCell
                        sx={{
                          color: "#194569",
                          cursor: "pointer",
                          color: "black",
                          fontSize: "13px",
                          "&:hover": {
                            color: "#fff",
                          },
                        }}
                        align="left"
                      >
                        <IconButton
                          sx={{ color: "#f0564e" }}
                          onClick={() => handleDelete(product)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6">No Results Found</Typography>
        )}
      </Grid>
      {open && (
        <UpdateProduct
          copyFullProducts={copyFullProducts}
          open={open}
          onClose={onClose}
          data={data}
          updateProducts={updateProducts}
        />
      )}
    </Box>
  );
}

export default TableView;
