console.log(localStorage.getItem('token'));

const setHeaders = () => {
    return {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
}

export default setHeaders