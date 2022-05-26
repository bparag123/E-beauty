import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slices/userSlice.js'
import treatmentSlice from './slices/treatmentSlice.js'
import errorSlice from './slices/errorSlice.js'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        treatment: treatmentSlice.reducer,
        error: errorSlice.reducer
    }
}
)

export default store