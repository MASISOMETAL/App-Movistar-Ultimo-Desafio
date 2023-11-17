import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { ApiKey, AuthURL } from "../constants/Firebase"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: AuthURL }),
    endpoints: (builder) => ({
        singUp: builder.mutation({
            query: ({ ...auth }) =>
                    ({
                        url: `accounts:signUp?key=${ApiKey}`,
                        method: 'POST',
                        body: auth,
                    }),
        }),
        singIn: builder.mutation({
            query: ({ ...auth }) =>
            ({
                url: `accounts:signInWithPassword?key=${ApiKey}`,
                method: 'POST',
                body: auth,
            })
        })
    })
})

export const { useSingInMutation, useSingUpMutation } = authApi