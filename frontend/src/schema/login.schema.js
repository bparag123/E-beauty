import * as yup from 'yup'

const loginSchema = yup.object().shape({
    email: yup.string().email('Please Provide Valid Email').required('Email is Required'),
    password: yup.string().required('Please Provide Password')
})

export default loginSchema