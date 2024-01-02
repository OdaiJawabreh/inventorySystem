import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cartItem: [],
 products:[],
 copyFullProducts:[]
};

const productStore = createSlice({
  name: "products", 
  initialState,
  reducers: {
    setCartItem(state, { payload }) {
      state.cartItem = [...state.cartItem, payload];
    },
    setProduct(state,{payload}){
      state.products = [ ...payload];

    },
    setCopyProduct(state,{payload}){
      state.copyFullProducts = [ ...payload];

    }
  },
});


export const { setCartItem,setProduct,setCopyProduct  } = productStore.actions;

export default productStore.reducer;
