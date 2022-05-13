import userSlice from "./slices/userSlice"
import { login } from '../api/auth';

//This is a custom Thunk which will create action for getting User Data from server
export const loginUser = (data) => {
    return async (dispatch) => {
        const response = await login(data)
        localStorage.setItem('token', response.access_token)
        dispatch(userSlice.actions.login(response))
    }
}