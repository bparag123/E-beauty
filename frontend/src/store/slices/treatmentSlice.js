import { createSlice } from '@reduxjs/toolkit'

const treatmentSlice = createSlice({
    name: 'treatment',
    initialState: {
        treatment: []
    },
    reducers: {
        getAllTreatments(state, { payload }) {
            state.treatment = payload
        }
    }
})

export default treatmentSlice