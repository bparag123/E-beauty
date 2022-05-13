import * as yup from 'yup'

const signUpSchema = yup.object().shape({
    email: yup.string().email('Please Provide Valid Email').required('Email is Required'),
    password: yup.string().required('Please Enter Password'),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Confirm Password and Password should be same").required("Confirm Password is Required"),
    username: yup.string().min(4, "User Name should be at least 4 Character Long").required('Please Enter Username')
})

export default signUpSchema