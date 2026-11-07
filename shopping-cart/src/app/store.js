import { configureStore } from "@reduxjs/toolkit";
import { commerceApi } from "../api/commerceApi.js";
import cartReducer from "../features/cart/cartSlice.js";
import wishlistReducer from "../features/wishlist/wishlistSlice.js";
import ordersReducer from "../features/orders/ordersSlice.js";

const STORAGE_KEY = "morrow-market:prototype:v1";

function readPersistedState() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn("Could not restore the saved storefront state:", error);
    return {};
  }
}

const savedState = readPersistedState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    [commerceApi.reducerPath]: commerceApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commerceApi.middleware),
  preloadedState: {
    cart: savedState.cart,
    wishlist: savedState.wishlist,
    orders: savedState.orders
  }
});

// Persist only user-owned prototype data. RTK Query's request cache is deliberately excluded.
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders
      }));
    } catch (error) {
      console.warn("Could not persist storefront state:", error);
    }
  });
}
