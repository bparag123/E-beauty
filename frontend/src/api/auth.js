import axios from "axios"
import { showToaster } from "../utils/toaster";
const instance = axios.create({
    baseURL: 'http://localhost:8000/auth/',
});

export const login = async (credentials) => {
    try {
        const response = await instance({
            method: 'post',
            url: '/login',
            data: credentials
        })
        const access_token = { ...response.data }
        showToaster('success', "Login Successful!")
        return access_token
    } catch (error) {
        return Promise.reject(error)
    }



}
