import axios from "axios"
const instance = axios.create({
    baseURL: 'http://localhost:8000/treatment/',
});

export const treatment = async () => {

    const token = 'Here i will send the token'
    const response = await instance({
        method: 'get',
        url: '',
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    console.log(response.data);
    return response.data
}
