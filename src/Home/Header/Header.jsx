import React, { useState } from "react";
import { Box, Grid, TextField, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CreateProduct from "../Create/CreateProduct"
import jwtDecode from 'jwt-decode';

// ===================== Support Function
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "green",
  borderRadius: "0px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "darkgreen", // You can change this to match the hover color if needed.
  },
}));

function Header({
  filter,
  changeFilter,
  count,
  updateProducts,
  copyFullProducts,
}) {
  const token = localStorage.getItem("token");
  const {role} = jwtDecode(token);
  // ================== State
  const [open, setOpen] = useState(false);
  // ================= Methods
  const onClose = () => setOpen(false);
  const handleInputChange = (event) => {
    changeFilter({
      ...filter,
      name: event.target.value,
    });
  };
  return (
    <Box sx={{ width: "100%" }}>
    <Grid container spacing={2}>
      {/* First item */}
      <Grid item xs={12} sm={3} display="flex" justifyContent="start" alignItems="center">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontWeight: "bold", marginRight: "8px", fontSize: '20px' }}>Total Products :</span>
          <span style={{ fontSize: "18px", color: "#222656"}}>{count}</span>
        </div>
      </Grid>

      {/* Second item */}
      <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
        <TextField
          onChange={handleInputChange}
          value={filter.name}
          fullWidth
          size="small"
          placeholder="What are you looking for?"
          sx={{
            backgroundColor: "#ffff",
            borderRadius: "5px",
            "& .MuiOutlinedInput-input": {
              pl: "30px", // Space for the icon
              borderRadius: "20px",
            },
          }}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      {/* Third item */}
      <Grid item xs={12} sm={3} display="flex" justifyContent="end" alignItems="center">
        {role == 'admin' &&<CustomButton variant="contained" endIcon={<AddIcon />} size="large" onClick={()=> {setOpen(true)}}>
          Add Product
        </CustomButton>}
      </Grid>
    </Grid>

    {open && <CreateProduct copyFullProducts={copyFullProducts} open={open} onClose={onClose}   updateProducts={updateProducts}/>}
  </Box>
  )
}

export default Header;
