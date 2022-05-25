import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import signUpSchema from '../../schema/signup.schema';
import classes from './SignUp.module.css'
import { signUp } from '../../api/signup';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormControl, FormGroup, IconButton, InputAdornment, TextField, } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const authSlice = useSelector(state => state.user)
    const { isLoggedIn } = authSlice
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordVisiblity = () => {
        setShowPassword(state => !state)
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            setIsLoading((prev) => true);
            console.log(values);
            await signUp(values)
            setIsLoading((prev) => false)
            navigate('/login', { replace: true, })

        },
        validationSchema: signUpSchema
    })

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/treatments', { replace: true })
        }
    }, [isLoggedIn, navigate])

    return (
        <div className={classes['signUpForm']}>
            <FormGroup >
                <FormControl variant="standard">
                    <TextField error={formik.errors.username && formik.touched.username} helperText={formik.errors.username} id="username" label="Username" variant="standard" placeholder='Username' {...formik.getFieldProps('username')} />
                </FormControl>
                <FormControl variant="standard">
                    <TextField error={formik.errors.email && formik.touched.email} helperText={formik.errors.email} id="email" label="Email" variant="standard" placeholder='Email' {...formik.getFieldProps('email')} />
                </FormControl>
                <FormControl>
                    <TextField type={showPassword ? 'text' : 'password'} error={formik.errors.password && formik.touched.password} helperText={formik.errors.password} id="password" label="Password" variant="standard" placeholder='Password'
                        {...formik.getFieldProps('password')} InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handlePasswordVisiblity}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} />
                </FormControl>
                <FormControl variant='standard'>
                    <TextField type={showPassword ? 'text' : 'password'} error={formik.errors.confirmPassword && formik.touched.confirmPassword} helperText={formik.errors.confirmPassword} id="confirm-password
                    " label="Confirm Password" variant="standard" placeholder='Confirm Password'
                        {...formik.getFieldProps('confirmPassword')} InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handlePasswordVisiblity}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }} />
                </FormControl>
                <LoadingButton loading={isLoading} variant="contained" type='submit' onClick={formik.handleSubmit}>
                    Sign Up
                </LoadingButton>
                <Link to={'/signup'}>Don't have an account?</Link>

            </FormGroup>
        </div>
    );
}

export default SignUp;
