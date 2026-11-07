import * as mockProvider from "./providers/dummyJsonProvider.js";
import * as backendProvider from "./providers/backendProvider.js";

// Switch VITE_COMMERCE_PROVIDER=backend when the Express API is ready.
// The service contract remains stable for RTK Query and React components.
const provider = import.meta.env.VITE_COMMERCE_PROVIDER === "backend"
  ? backendProvider
  : mockProvider;

export const productService = {
  getProducts: (params) => provider.getProducts(params),
  getProductById: (id) => provider.getProductById(id),
  getDepartments: () => provider.getDepartments()
};
