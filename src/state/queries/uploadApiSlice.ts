import { createApi } from "@reduxjs/toolkit/query/react"
import { APIData } from "@/types/api.type"
import { ICustomer, IUploadHistory } from "@/types/upload.type"
import { baseQuery } from "@/common/middlewares"

const uploadApiSlice = createApi({
  reducerPath: "uploadApiSlice",
  baseQuery: baseQuery,
  tagTypes: ["data", "history"],
  endpoints: builder => ({
    getUploadData: builder.query<ICustomer[], void>({
      query: () => "/rp-data",
      providesTags: [{ type: "data", id: "LIST" }],
      transformResponse: (response: APIData<ICustomer[]>) => response.data,
    }),
    getUploadHistories: builder.query<IUploadHistory[], void>({
      query: () => "/upload-history",
      providesTags: [{ type: "history", id: "LIST" }],
      transformResponse: (response: APIData<IUploadHistory[]>) => response.data,
    }),
  }),
})

export const { useGetUploadHistoriesQuery, useGetUploadDataQuery } =
  uploadApiSlice
export default uploadApiSlice
