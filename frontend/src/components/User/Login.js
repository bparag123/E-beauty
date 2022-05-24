import React, { useEffect, useState } from 'react';
import { FormControl, FormGroup } from '@mui/material';
import { useFormik } from 'formik'
import loginSchema from '../../schema/login.schema';
import classes from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/custom-actions'
import { useNavigate, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment, TextField } from '@mui/material'
const Login = () => {
    console.log("Component Rendered");
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const authSlice = useSelector(state => state.user)
    const { isLoggedIn } = authSlice
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            setIsLoading(state => true)
            dispatch(loginUser(values))
            setIsLoading(state => false)
            navigate('/treatments', { replace: true })
        },
        validationSchema: loginSchema
    })
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordVisiblity = (e) => {
        setShowPassword(state => !state)
    }

    useEffect(() => {
        console.log("Use Effect Run");
        if (isLoggedIn) {
            navigate('/treatments', { replace: true })
        }
    }, [isLoggedIn, navigate])

    return (
        <div >

            <FormGroup className={classes['loginForm']}>
                <FormControl variant="standard">
                    <TextField error={formik.errors.email && formik.touched.email} helperText={formik.errors.email} id="standard-basic" label="Email" variant="standard" placeholder='Email' {...formik.getFieldProps('email')} />
                </FormControl>
                <FormControl variant='standard'>
                    <TextField type={showPassword ? 'text' : 'password'} error={formik.errors.password && formik.touched.password} helperText={formik.errors.password} id="standard-basic" label="Password" variant="standard" placeholder='Password'
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
                    <LoadingButton loading={isLoading} variant="contained" type='submit' onClick={formik.handleSubmit}>
                        Login
                    </LoadingButton>
                    <Link to={'/signup'}>Don't have an account?</Link>
                </FormControl>

            </FormGroup>
        </div >
    );
}

export default Login;
