import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    token: null,
    localId: null,
    userName: null,
    userRange: null,
    allUsers: []
}

export const authSlice = createSlice({
    name: `auth`,
    initialState,
    reducers: {
        singUp: (state, action) => {
            return {
                userId: action.payload.email,
                token: action.payload.idToken,
                localId: action.payload.localId,
            }
        },
        singIn: (state, action) => {
            return {
                userId: action.payload.email,
                token: action.payload.idToken,
                localId: action.payload.localId,
            }
        },
        infoUserData: (state, action) => {
            const { userName, userRange } = action.payload
            return {
                ...state,
                userName,
                userRange
            }
        },
        infoAllUsers: (state, action) => {
            return {
                ...state,
                allUsers: action.payload
            }
        },
        logOut: (state) => {
            return initialState
        }
    }
})

export const { singUp, singIn, infoUserData, infoAllUsers, logOut } = authSlice.actions

export default authSlice.reducer