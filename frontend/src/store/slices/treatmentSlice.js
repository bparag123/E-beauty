import { createSlice } from '@reduxjs/toolkit'

const treatmentSlice = createSlice({
    name: 'treatments',
    initialState: {
        treatments: []
    },
    reducers: {
        getAllTreatments(state, { payload }) {
            console.log(payload);
            state.treatments = payload
        }
    }
})

export default treatmentSlice