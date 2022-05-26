import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: 'error',
    initialState: [],
    reducers: {
        setError(state, { payload }) {
            let already = state.some((ele) => ele.status === payload.status)
            if (!already) {
                state.push(payload)
            }
        },
        resolved(state, { payload }) {
            let i = state.findIndex((ele) => ele.status === payload.status)
            if (i > -1) {
                state = state.splice(i, 1)
            }
        }
    }
})

export default errorSlice