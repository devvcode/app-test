import { createMockOrder } from "./providers/mockOrderProvider.js";
import * as backendProvider from "./providers/backendProvider.js";

export const orderService = {
  createOrder(payload) {
    return import.meta.env.VITE_COMMERCE_PROVIDER === "backend"
      ? backendProvider.createOrder(payload)
      : createMockOrder(payload);
  }
};
