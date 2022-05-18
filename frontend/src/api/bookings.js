import axios from "axios"
const instance = axios.create({
    baseURL: 'http://localhost:8000/bookings/',
});

export const checkAvailability = async (data) => {
    const response = await instance({
        method: 'post',
        url: 'check-availability',
        data
    })
    return response.data
}

export const bookSlot = async (data) => {
    const response = await instance({
        method: 'post',
        url: '',
        data
    })
    return response.data
}
