import { createSlice } from '@reduxjs/toolkit'
const token = localStorage.getItem('token')
const initialState = {
    isLoggedIn: token ? true : false,
    userEmail: '',
    token: token ? token : ''
}
console.log(initialState);
const userSlice = createSlice({
    initialState: initialState,
    name: 'user',
    reducers: {
        login(state, { payload }) {
            console.log(payload);
            state.isLoggedIn = true
            state.token = payload.access_token
        },
        logout(state, action) {
            state.isLoggedIn = false
            state.token = ''
        }
    }
})

export default userSlice