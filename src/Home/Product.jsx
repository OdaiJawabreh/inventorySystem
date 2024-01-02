import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { getProducts } from "./services";
import Header from "./Header/Header";
import Filter from "./Filter/Filter";
import Grid from "@mui/material/Grid";
import CardView from "./Card/CardView";
import TableView from "./Table/TableView";
import Pagination from "./pagination/pagination";
import {setProduct,setCopyProduct} from "../Store/productStore"
import { useSelector, useDispatch } from "react-redux";

function Product() {
  const dispatch = useDispatch()
  const {products} = useSelector((state) => state.productStore);
  const {copyFullProducts} = useSelector((state) => state.productStore);
  const {cartItem} = useSelector((state) => state.productStore);
  // const [products, setProducts] = useState([]);
  // const [copyFullProducts, setCopyProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [viewFlag, setViewFlag] = useState("card");
  const [pages, setPages] = useState(12);
  const [page, setPage] = useState(1);
  const [flagFilter, setFlagFilter] = useState(false)
  const [filter, setFilter] = useState({
    name: "",
    maxPrise: "",
    minPrice: "",
    
  });
    // ======================== methods =======================
    const countOccurrences = () => {
      return cartItem.reduce((acc, item) => {
        const id = item.id;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {});
    };
    const finProducts = async () => {
      const response = await getProducts({...filter});
      const cartContiner = countOccurrences();
      const checkCart = response.map((el)=>{
        if(el.id+"" in cartContiner ){
           return {
            ...el,
            stockQuantity : el.stockQuantity - cartContiner[el.id+""]
           }
        }else return el
      })
      dispatch(setProduct(checkCart.slice(1 - page, 1 - page + 8)))
      setPages(Math.ceil(checkCart.length / 8));
      dispatch(setCopyProduct(checkCart))

    };
    const changeFlagView = (value) => {
      setViewFlag(value);
    };
    const changeFilter = (filterDto) => {
      setFilter(filterDto);
    };
    const changeFilterValue = async  () => {
      const response = await getProducts({...filter});
      const cartContiner = countOccurrences();
      const checkCart = response.map((el)=>{
        if(el.id+"" in cartContiner ){
           return {
            ...el,
            stockQuantity : el.stockQuantity - cartContiner[el.id+""]
           }
        }else return el
      })
      dispatch(setProduct(checkCart.slice(1 - page, 1 - page + 8)))
      setPages(Math.ceil(checkCart.length / 8));
      setSearchResult(checkCart)
      setFlagFilter(true)
    };
    const resetSearch= () =>{
      dispatch(setProduct(copyFullProducts.slice(0, 8)))
      setPages(Math.ceil(copyFullProducts.length / 8));
      setPage(1)
      setFlagFilter(false)
    }
    const isCardView = () => {
      return viewFlag === "card";
    };
    
    const updateProducts = (items) => {
      if (items.length / 8 > pages) {
        setPages(Math.ceil(items.length / 8));
      }
      dispatch(setCopyProduct(items))

      let n = page - 1;
      n = n * 8;
      dispatch(setProduct(items.slice(n, n + 8)))

    };
    const changePage = async (currentPage) => {
      const filteredData = flagFilter ? searchResult : copyFullProducts
      setPage(currentPage);
      let n = currentPage - 1;
      n = n * 8;
      dispatch(setProduct(filteredData.slice(n, n + 8)))
      
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