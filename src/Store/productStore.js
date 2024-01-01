import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 products: []
};

const productStore = createSlice({
  name: "products", 
  initialState,
  reducers: {
    setProducts(state, { payload }) {
      state.products = [...payload];
    },
  },
});


export const { setProducts,  } = productStore.actions;

export default productStore.reducer;
