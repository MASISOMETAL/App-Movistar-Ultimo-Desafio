import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from "../constants/Firebase"

export const managementApi = createApi({
    reducerPath: "managementApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        insertSells: builder.mutation({
            query: ({localId, inputs}) => ({
                url: `sells.json`,
                method: 'POST',
                body: {...inputs, id: localId}
            })
        }),
        getSells: builder.query ({
            query: () => `sells.json`
        })
    })
})

export const { useInsertSellsMutation, useGetSellsQuery } = managementApi