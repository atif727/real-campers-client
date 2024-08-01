import { baseApi } from "../../api/baseApi";

const allProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allProducts: builder.query({
      query: (query) => ({
        url: `/products${query}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAllProductsQuery } = allProductsApi;
