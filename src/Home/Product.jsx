import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { getProducts } from "./services";
import Header from "./Header/Header";
import Filter from "./Filter/Filter";
import Grid from "@mui/material/Grid";
import CardView from "./Card/CardView";
import TableView from "./Table/TableView";
import Pagination from "./pagination/pagination";

function Product() {
  const [products, setProducts] = useState([]);
  const [copyFullProducts, setCopyProducts] = useState([]);
  const [viewFlag, setViewFlag] = useState("card");
  const [pages, setPages] = useState(12);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    name: "",
    maxPrise: "",
    minPrice: "",
    
  });
    // ======================== methods =======================
    const finProducts = async () => {
      const response = await getProducts({...filter});
      setProducts(response.slice(1 - page, 1 - page + 9));
      setPages(Math.ceil(response.length / 9));
      setCopyProducts(response);
    };
    const changeFlagView = (value) => {
      setViewFlag(value);
    };
    const changeFilter = (filterDto) => {
      setFilter(filterDto);
    };
    const changeFilterValue = async  () => {
      const response = await getProducts({...filter});
      setProducts(response.slice(0, 9));
      setPages(Math.ceil(response.length / 9));
    };
    const resetSearch= () =>{
      setProducts([...copyFullProducts])
      setPages(Math.ceil(copyFullProducts.length / 9));
      setPage(1)
    }
    const isCardView = () => {
      return viewFlag === "card";
    };
    const updateProducts = (users) => {
      if (users.length / 9 > pages) {
        setPages(Math.ceil(users.length / 9));
      }
      setCopyFullUsers(users);
      let n = page - 1;
      n = n * 9;
      setUsers(users.slice(n, n + 9));
    };
    const changePage = (currentPage) => {
      const filteredData = changeFilterValue();
      setPage(currentPage);
      let n = currentPage - 1;
      n = n * 9;
      setProducts(filteredData.slice(n, n + 9));
    };
      //============================ use Effect =================

  useEffect(() => {
    finProducts();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
      <Grid item xs={12}>
          <Header
            filter={filter}
            changeFilter={changeFilter}
            count={copyFullProducts.length}
            updateProducts={updateProducts}
            copyFullProducts={copyFullProducts}
          />
        </Grid>
        <Grid item xs={12}>
          <Filter resetSearchFilter={resetSearch} changeFilterValue={changeFilterValue} changeFlagView={changeFlagView} viewFlag={viewFlag} filter={filter} changeFilter={changeFilter} />
        </Grid>
      </Grid>

    </Box>
    
  )
}

export default Product