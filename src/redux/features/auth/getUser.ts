import { baseApi } from "../../api/baseApi";

const singleUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleUser: builder.query({
      query: (email: string) => ({
        url: `/users/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSingleUserQuery } = singleUserApi;