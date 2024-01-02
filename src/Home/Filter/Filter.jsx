import React, { useState } from "react";
import { Box, Grid, Slider, Typography, Button } from "@mui/material";
import { BsGrid, BsListUl } from "react-icons/bs";
import styles from "./Style.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";

function Filter({
  resetSearchFilter,
  changeFilterValue,
  viewFlag,
  changeFlagView,
  filter,
  changeFilter,
}) {
  const [loadingSearch, setIsLoadingSearch] = useState(false);
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
    setValue([0, 100]);
    changeFilter({
      name: "",
      minPrice: "",
      maxPrice: "",
    });
    resetSearchFilter();
  };
  const search = async () => {
    setIsLoadingSearch(true);
    await changeFilterValue();
    setIsLoadingSearch(false);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {/* First item */}
        <Grid
          item
          xs={12}
          sm={3}
          display="flex"
          justifyContent="start"
          alignItems="center"
        >
          <div className={styles.mainHeader}>
            <div>
              <BsGrid
                onClick={() => {
                  changeFlagView("card");
                }}
                className={`${styles.gridIcon} ${
                  viewFlag === "card" ? styles.active : ""
                }`}
              />
              <BsListUl
                onClick={() => {
                  changeFlagView("table");
                }}
                className={`${styles.columIcon} ${
                  viewFlag === "table" ? styles.active : ""
                }`}
              />
            </div>
          </div>
        </Grid>
        {/* Second item */}
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
            sx={{ color: "#222656" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          <LoadingButton
            size="large"
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
            endIcon={<SearchIcon />}
            onClick={() => {
              search();
            }}
            loading={loadingSearch}
          >
            Search Now
          </LoadingButton>
          <LoadingButton
            size="large"
            variant="contained"
            sx={{
              textTransform: "capitalize",
              width: "100%",
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
            endIcon={<SearchIcon />}
            onClick={() => {
              resetSearch();
            }}
          >
            Reset
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Filter;
