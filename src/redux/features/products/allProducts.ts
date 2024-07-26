import { baseApi } from "../../api/baseApi";

const allProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useAllProductsQuery } = allProductsApi;
