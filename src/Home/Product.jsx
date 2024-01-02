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
      setProducts(response.slice(1 - page, 1 - page + 8));
      setPages(Math.ceil(response.length / 8));
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
      setProducts(response.slice(0, 8));
      setPages(Math.ceil(response.length / 8));
      return response
    };
    const resetSearch= () =>{
      setProducts(copyFullProducts.slice(0, 8));
      setPages(Math.ceil(copyFullProducts.length / 8));
      setPage(1)
    }
    const isCardView = () => {
      return viewFlag === "card";
    };
    
    const updateProducts = (users) => {
      if (users.length / 8 > pages) {
        setPages(Math.ceil(users.length / 8));
      }
      setCopyProducts(users);
      let n = page - 1;
      n = n * 8;
      setProducts(users.slice(n, n + 8));
    };
    const changePage = async (currentPage) => {
      const filteredData = await changeFilterValue();
      setPage(currentPage);
      let n = currentPage - 1;
      n = n * 8;
      setProducts(filteredData.slice(n, n + 8));
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

        <Grid item xs={12}>
          {isCardView() ? (
            <CardView products={products}   updateProducts={updateProducts} copyFullProducts={copyFullProducts} onAddCart={()=>{'added'}}/>
          ) : (
            <TableView products={products}   updateProducts={updateProducts} copyFullProducts={copyFullProducts} />
          )}
      </Grid>
      {products.length && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Pagination page={page} pages={pages} changePage={changePage} />
          </Grid>
        )}
      </Grid>

    </Box>
    
  )
}

export default Product