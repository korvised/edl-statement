import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQuery } from "@/common/middlewares"
import {
  IResetUserPasswordParams,
  IUser,
  IUserBody,
  IEditUserParams,
} from "@/types/user.type"
import { APIData } from "@/types/api.type"

const userApiSlice = createApi({
  reducerPath: "userApiSlice",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: builder => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/user",
      providesTags: [{ type: "User", id: "LIST" }],
      transformResponse: (response: APIData<IUser[]>) => response.data,
    }),
    registerUser: builder.mutation<APIData<IUser>, IUserBody>({
      query: body => ({
        url: "register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<APIData<IUser>, IEditUserParams>({
      query: ({ id, body }) => ({
        url: `/users/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateStatus: builder.mutation<APIData<IUser>, number>({
      query: id => `lock-or-unlock/${id}`,
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<APIData<IUser>, IResetUserPasswordParams>({
      query: ({ id, newPassword }) =>
        `change-pass/${id}?newPassword=${newPassword}`,
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useUpdateStatusMutation,
  useResetPasswordMutation,
} = userApiSlice
export default userApiSlice
