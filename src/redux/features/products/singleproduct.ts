import { baseApi } from "../../api/baseApi";

const singleProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSingleProductQuery } = singleProductsApi;
