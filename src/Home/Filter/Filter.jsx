import React, { useState } from "react";
import { Box, Grid, TextField, Slider , Typography, styled, Button } from "@mui/material";
import { BsGrid, BsListUl } from "react-icons/bs";
import styles from "./Style.module.css";
import SearchIcon from "@mui/icons-material/Search";
// ===================== Support Function
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "green",
  borderRadius: "0px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "darkgreen", // You can change this to match the hover color if needed.
  },
}));
function Filter({resetSearchFilter, changeFilterValue, viewFlag, changeFlagView, filter, changeFilter}) {
  const [value, setValue] = useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changeFilter({
      ...filter,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };
  const resetSearch = () => {
    setValue([0,100])
    changeFilter({
      name:"",
      minPrice: "",
      maxPrice: "",
    });
    resetSearchFilter()
  }
  return (
    <Box sx={{ width: "100%" }}>
    <Grid container spacing={2}>
      {/* First item */}
      <Grid item xs={12} sm={3} display="flex" justifyContent="start" alignItems="center">
        <div className={styles.mainHeader}>
          <div>
            <BsGrid
              onClick={()=>{changeFlagView("card")}}
              className={`${styles.gridIcon} ${viewFlag==='card' ? styles.active : ""}`}
            />
            <BsListUl
              onClick={()=>{changeFlagView("table")}}
              className={`${styles.columIcon} ${viewFlag==='table' ? styles.active : ""}`}
            />
          </div>
        </div>
      </Grid>
      {/* Second item */}
      <Grid item xs={12} sm={6} display="flex" justifyContent="center" alignItems="center">
      <Typography gutterBottom>Price Range</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value}Jd`}
        min={0}
        max={100}
        step={1}
        size="medium"
        sx={{color:'#222656'}}
      />
      </Grid>
      <Grid item xs={12} sm={3} display="flex" justifyContent="end" alignItems="center">
        <CustomButton variant="contained" endIcon={<SearchIcon />} size="large" onClick={()=> {changeFilterValue()}}>
          Search Now
        </CustomButton>
        <CustomButton variant="contained" endIcon={<SearchIcon />} size="large" onClick={()=> {resetSearch()}}>
          Reset
        </CustomButton>
      </Grid>


    </Grid>
  </Box>
  );
}

export default Filter;
