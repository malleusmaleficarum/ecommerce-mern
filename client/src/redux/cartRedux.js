import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1; //cart quantity number
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity; //product quantity number
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
