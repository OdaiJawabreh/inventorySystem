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
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
function TableView({ products, updateProducts, copyFullProducts, onAddCart }) {
  const handleUpdate = (productId) => {
    // Implement update logic
  };

  const handleDelete = (productId) => {
    // Implement delete logic
  };

  const handleAddToCart = (productId) => {
    // Implement add to cart logic
  };
  return (
    <Box sx={{ display:'flex', justifyContent: 'center', marginLeft: "20px", marginTop:"50px"}}>
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
                  <TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    Edit
                  </TableCell>
                  <TableCell
                    sx={{ color: "black", fontSize: "18px" }}
                    align="left"
                  >
                    delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((card, index) => (
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
                        {card.name}
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
                        {card.price}JD
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
                        {card.stockQuantity}
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
                        >
                          <AddShoppingCartIcon /> Add to Cart
                        </Button>
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
                        <IconButton
                          sx={{ color: "#222656" }}
                          onClick={() => handleUpdate(product.id)}
                        >
                          <EditIcon />
                        </IconButton>
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
                        <IconButton
                          sx={{ color: "#f0564e" }}
                          onClick={() => handleDelete(product.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6">No Results Found</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default TableView;
