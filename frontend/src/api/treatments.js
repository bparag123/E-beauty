import axios from "axios"
import setHeaders from "./headerConfig";
const instance = axios.create({
    baseURL: 'http://localhost:8000/treatment/',
});

export const treatment = async () => {

    const response = await instance({
        method: 'get',
        url: '',
        headers: setHeaders()
    })
    console.log("Response from Treatment Service", response.data);
    return response.data
}


// export const getTreatmentById = async (id) => {
//     const response = await instance({
//         method: 'get',
//         url: `/${id}`,
//         headers: setHeaders()
//     })
//     console.log("Response from Treatment Service", response.data);
//     return response.data
// }
