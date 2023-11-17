import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Lenguage: "ES",
}

export const lenguageSlice = createSlice({
    name: 'lenguage',
    initialState,
    reducers: {
        selectLenguage: (state, action) => {
            state.Lenguage = action.payload
        },

    },
})

export const { selectLenguage } = lenguageSlice.actions

export default lenguageSlice.reducer