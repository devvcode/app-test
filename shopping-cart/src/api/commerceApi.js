import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { productService } from "../services/productService.js";

function toApiError(error) {
  return {
    status: "CUSTOM_ERROR",
    error: error instanceof Error ? error.message : "Something went wrong."
  };
}

export const commerceApi = createApi({
  reducerPath: "commerceApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products", "Departments"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      async queryFn(params = {}) {
        try {
          return { data: await productService.getProducts(params) };
        } catch (error) {
          return { error: toApiError(error) };
        }
      },
      providesTags: (result) =>
        result?.products
          ? [...result.products.map((product) => ({ type: "Products", id: product.id })), { type: "Products", id: "LIST" }]
          : [{ type: "Products", id: "LIST" }]
    }),
    getProductById: builder.query({
      async queryFn(id) {
        try {
          return { data: await productService.getProductById(id) };
        } catch (error) {
          return { error: toApiError(error) };
        }
      },
      providesTags: (_result, _error, id) => [{ type: "Products", id }]
    }),
    getDepartments: builder.query({
      async queryFn() {
        try {
          return { data: await productService.getDepartments() };
        } catch (error) {
          return { error: toApiError(error) };
        }
      },
      providesTags: ["Departments"]
    })
  })
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetDepartmentsQuery
} = commerceApi;
