import axios from "axios"
import { showToaster } from "../utils/toaster";
const instance = axios.create({
    baseURL: 'http://localhost:8000/user/',
});

export const signUp = async (data) => {

    const response = await instance({
        method: 'post',
        url: '',
        data: data
    })
    showToaster('info', "User Successfully Created!")
    return response.data
}
