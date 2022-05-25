import axios from "axios"
import setHeaders from "./headerConfig";
const instance = axios.create({
    baseURL: 'http://localhost:8000/bookings/',
});

export const checkAvailability = async (data) => {
    const response = await instance({
        method: 'post',
        url: 'check-availability',
        data,
        headers: setHeaders()
    })
    return response.data
}

export const bookSlot = async (data) => {
    const response = await instance({
        method: 'post',
        url: '',
        data,
        headers: setHeaders()
    })
    return response.data
}

export const getBookingOfUser = async () => {
    const response = await instance({
        method: 'get',
        url: '',
        headers: setHeaders()
    })
    return response.data
}