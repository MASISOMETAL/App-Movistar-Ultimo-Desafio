import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from "../constants/Firebase"

export const infoUserApi = createApi({
    reducerPath: "infoUserApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        singUpDataUser: builder.mutation({
            query: ({ localId, userName }) => ({
                url: `infoUser/${localId}.json`,
                method: 'PUT',
                body: {
                    userName: userName,
                    userRange: "User"
                }
            })
        }),
        getDataUser: builder.query({
            query: (localId) => `infoUser/${localId}.json`
        }),
        getAllDataUser: builder.query({
            query: () => `infoUser.json`
        }),
        switchUserRange: builder.mutation({
            query: ({ localId, userName, newRange }) => ({
                url: `infoUser/${localId}.json`,
                method: 'PUT',
                body: {
                    userName: userName,
                    userRange: newRange
                }
            })
        }),
        setProfilePhoto: builder.mutation({
            query: ({ localId, userName, newRange, photoProfile }) => ({
                url: `infoUser/${localId}.json`,
                method: 'PUT',
                body: {
                    userName: userName,
                    userRange: newRange,
                    photoProfile: photoProfile
                }
            })
        })
    })
})

export const {
    useSingUpDataUserMutation,
    useGetDataUserQuery,
    useGetAllDataUserQuery,
    useSwitchUserRangeMutation,
    useSetProfilePhotoMutation
} = infoUserApi