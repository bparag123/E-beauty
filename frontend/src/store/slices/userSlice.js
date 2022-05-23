import { createSlice } from '@reduxjs/toolkit'
const token = localStorage.getItem('token')
const initialState = {
    isLoggedIn: token ? true : false,
    userEmail: '',
    token: token ? token : '',
    roles: ''
}
console.log(initialState);
const userSlice = createSlice({
    initialState: initialState,
    name: 'user',
    reducers: {
        login(state, { payload }) {
            console.log("Login Payload", payload);
            state.isLoggedIn = true
            state.token = payload.access_token
            state.roles = payload.roles
        },
        logout(state, action) {
            state.isLoggedIn = false
            state.token = ''
            state.roles = ''
        }
    }
})

export default userSlice