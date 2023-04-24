import { createApi } from "@reduxjs/toolkit/query/react"

import { IProvince } from "@/types/province.type"
import { APIData } from "@/types/api.type"
import { baseQuery } from "@/common/middlewares"

const provinceApiSlice = createApi({
  reducerPath: "provinceApiSlice",
  baseQuery: baseQuery,
  tagTypes: ["provinces"],
  endpoints: builder => ({
    getProvinces: builder.query<IProvince[], void>({
      query: () => "/province",
      providesTags: [{ type: "provinces", id: "LIST" }],
      transformResponse: (response: APIData<IProvince[]>) => response.data,
    }),
  }),
})

export const { useGetProvincesQuery } = provinceApiSlice
export default provinceApiSlice
