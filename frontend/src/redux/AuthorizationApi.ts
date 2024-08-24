import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const AuthorizationApi = createApi({
  reducerPath: "AuthorizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (build) => ({
    authorization: build.mutation({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
    }),
    registration: build.mutation({
      query: (body) => ({
        url: "/user/registration",
        method: "POST",
        body: body,
      }),
    }),
  }),
})

export const { useAuthorizationMutation } = AuthorizationApi
