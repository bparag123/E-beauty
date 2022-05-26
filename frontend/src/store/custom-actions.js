import userSlice from "./slices/userSlice"
import errorSlice from './slices/errorSlice';
import { login } from '../api/auth';
import { treatment } from "../api/treatments";
import treatmentSlice from "./slices/treatmentSlice";

//This is a custom Thunk which will create action for getting User Data from server
export const loginUser = (data) => {
    return async (dispatch) => {
        try {
            const response = await login(data)
            console.log(response);
            localStorage.setItem('token', response.access_token)
            dispatch(userSlice.actions.login(response))
        } catch (error) {
            dispatch(errorSlice.actions.setError(error.response.data))
        }

    }
}

export const getAllTreatments = () => {
    return async (dispatch) => {
        const response = await treatment();
        dispatch(treatmentSlice.actions.getAllTreatments(response))
    }
}