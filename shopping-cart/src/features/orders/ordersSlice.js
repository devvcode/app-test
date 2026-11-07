import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: [] },
  reducers: {
    orderAdded(state, action) {
      state.items.unshift(action.payload);
    }
  }
});

export const { orderAdded } = ordersSlice.actions;
export default ordersSlice.reducer;
