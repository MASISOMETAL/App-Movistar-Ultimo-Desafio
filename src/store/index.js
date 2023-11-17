import { configureStore } from '@reduxjs/toolkit'
import LenguageSlice from '../features/LenguageSlice'
import { authApi } from '../services/AuthService'
import { setupListeners } from '@reduxjs/toolkit/query'
import AuthSlice from '../features/AuthSlice'
import { infoUserApi } from '../services/InfoUserService'
import { managementApi } from '../services/ManagementService'

export const store = configureStore({
    reducer: {
        lenguage: LenguageSlice,
        auth: AuthSlice,
        [authApi.reducerPath]: authApi.reducer,
        [infoUserApi.reducerPath]: infoUserApi.reducer,
        [managementApi.reducerPath]: managementApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, infoUserApi.middleware, managementApi.middleware),
})

setupListeners(store.dispatch)