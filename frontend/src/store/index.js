import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slices/userSlice.js'
import treatmentSlice from './slices/treatmentSlice.js'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        treatment: treatmentSlice.reducer
    }
})

export default store