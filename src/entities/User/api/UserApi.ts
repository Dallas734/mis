import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../shared/RTKQuery/query";
import { LoginScheme } from "../types/LoginScheme";
import { ResponseScheme } from "../types/ResponseScheme";
import { User } from "../types/User";

export const UserApi = createApi({
  reducerPath: "Auth",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    auth: builder.mutation<ResponseScheme, LoginScheme>({
      query: (loginScheme) => ({
        url: "login",
        method: "POST",
        body: loginScheme,
        credentials: "include",
      }),
    }),
    isAuth: builder.query<User, void>({
      query: () => ({ url: "isauthenticated", method: "GET" }),
      providesTags: ["User"]
    }),
  }),
});

export const { useAuthMutation } = UserApi;
export const { useIsAuthQuery } = UserApi;