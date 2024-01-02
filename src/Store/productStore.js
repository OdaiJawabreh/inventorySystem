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
    setEmptyCartItem (state) {
      state.cartItem = []
    },
    setDeleteFromCart(state,{payload}){
      const {id,stockQuantity}=payload
      console.log(id,stockQuantity);
      state.cartItem = state.cartItem.filter((el)=>{
        return el.id !== id || el.stockQuantity !== stockQuantity
      }) 
    },
    setProduct(state,{payload}){
      state.products = [ ...payload];

    },
    setCopyProduct(state,{payload}){
      state.copyFullProducts = [ ...payload];

    }
  },
});


export const { setCartItem,setProduct,setCopyProduct , setDeleteFromCart, setEmptyCartItem } = productStore.actions;

export default productStore.reducer;
