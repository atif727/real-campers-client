import { baseApi } from "../../api/baseApi";

const updateProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation({
      query: (prop) => ({
        url: `/products/${prop.id}`,
        method: "PUT",
        body: prop.body
      }),
    }),
  }),
});

export const { useUpdateProductMutation } = updateProductApi;
