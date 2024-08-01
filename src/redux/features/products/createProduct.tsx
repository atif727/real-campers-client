import { baseApi } from "../../api/baseApi";

const createProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body: body
      }),
    }),
  }),
});

export const { useCreateProductMutation } = createProductApi;
