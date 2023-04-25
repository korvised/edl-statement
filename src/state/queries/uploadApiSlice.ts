import { createApi } from "@reduxjs/toolkit/query/react"
import { APIData } from "@/types/api.type"
import { ICustomer, IUploadHistory } from "@/types/upload.type"
import { baseQuery } from "@/common/middlewares"

const uploadApiSlice = createApi({
  reducerPath: "uploadApiSlice",
  baseQuery: baseQuery,
  tagTypes: ["upload"],
  endpoints: builder => ({
    getUploadHistories: builder.query<IUploadHistory[], void>({
      query: () => "/upload-history",
      providesTags: [{ type: "upload", id: "LIST" }],
      transformResponse: (response: APIData<IUploadHistory[]>) => {
        console.log(response)
        return response.data
      },
    }),
    getUploadData: builder.query<ICustomer[], void>({
      query: () => "/rp-data",
      providesTags: [{ type: "upload", id: "LIST" }],
      transformResponse: (response: APIData<ICustomer[]>) => response.data,
    }),
  }),
})

export const { useGetUploadHistoriesQuery, useGetUploadDataQuery } =
  uploadApiSlice
export default uploadApiSlice
