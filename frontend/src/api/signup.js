import axios from "axios"
const instance = axios.create({
    baseURL: 'http://localhost:8000/user/',
});

export const signUp = async (data) => {

    const response = await instance({
        method: 'post',
        url: '',
        data: data
    })
    console.log(response.data);
    return response.data
}
