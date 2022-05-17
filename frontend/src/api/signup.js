import axios from "axios"
import { toast } from "react-toastify";
const instance = axios.create({
    baseURL: 'http://localhost:8000/user/',
});

export const signUp = async (data) => {

    const response = await instance({
        method: 'post',
        url: '',
        data: data
    })
    toast.info('User Successfully Created', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    return response.data
}
