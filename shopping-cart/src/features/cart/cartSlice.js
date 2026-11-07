import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], couponCode: "" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { product, variant = null, quantity = 1 } = action.payload;
      const variantKey = variant ? Object.values(variant).join("|") : "default";
      const lineId = `${product.id}::${variantKey}`;
      const existing = state.items.find((item) => item.lineId === lineId);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stock ?? 99);
      } else {
        state.items.push({ lineId, product, variant, quantity });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.lineId !== action.payload);
    },
    setQuantity(state, action) {
      const { lineId, quantity } = action.payload;
      const item = state.items.find((entry) => entry.lineId === lineId);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.lineId !== lineId);
        return;
      }
      item.quantity = Math.min(quantity, item.product.stock ?? 99);
    },
    setCouponCode(state, action) {
      state.couponCode = action.payload.trim().toUpperCase();
    },
    clearCart(state) {
      state.items = [];
      state.couponCode = "";
    }
  }
});

export const { addItem, removeItem, setQuantity, setCouponCode, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
