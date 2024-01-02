import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cartItem: []
};

const productStore = createSlice({
  name: "products", 
  initialState,
  reducers: {
    setCartItem(state, { payload }) {
      console.log("payload",payload );
      state.cartItem = [...state.cartItem, payload];
    },
  },
});


export const { setCartItem,  } = productStore.actions;

export default productStore.reducer;
