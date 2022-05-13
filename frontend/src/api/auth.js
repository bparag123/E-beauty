import axios from "axios"
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
    return access_token
}
