import axios from "axios"
import { toast } from "react-toastify";
const instance = axios.create({
    baseURL: 'http://localhost:8000/auth/',
});

export const login = async (credentials) => {
    const response = await instance({
        method: 'post',
        url: '/login',
        data: credentials
    })
    const access_token = { ...response.data }
    
    toast.success('Login Successfull!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    return access_token
}
