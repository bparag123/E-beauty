import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import signUpSchema from '../../schema/signup.schema';
import classes from './SignUp.module.css'
import { signUp } from '../../api/signup';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const authSlice = useSelector(state => state.user)
    const { isLoggedIn } = authSlice

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values) => {
            setIsLoading((prev) => true);
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
        <div>
            <Form inline onSubmit={formik.handleSubmit} className={classes['signUpForm']}>
                <FormGroup floating>
                    <Input
                        id="username"
                        placeholder="Username"
                        type="username"
                        {...formik.getFieldProps('username')}
                    />
                    <Label for="username">
                        Username
                    </Label>
                </FormGroup>
                {formik.touched.username && formik.errors.username && (
                    <p>{formik.errors.username}</p>
                )}
                <FormGroup floating>
                    <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    <Label for="email">
                        Email
                    </Label>
                </FormGroup>
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
                <FormGroup floating>
                    <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        {...formik.getFieldProps("password")}
                    />
                    <Label for="password">
                        Password
                    </Label>
                </FormGroup>
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}
                <FormGroup floating>
                    <Input
                        id="confirmPassword"
                        placeholder="Password"
                        type="password"
                        {...formik.getFieldProps("confirmPassword")}
                    />
                    <Label for="confirmPassword">
                        Confirm Password
                    </Label>
                </FormGroup>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p>{formik.errors.confirmPassword}</p>
                )}
                <Button color='primary'>
                    {isLoading ? <Spinner>
                        Loading...
                    </Spinner> : "Sign Up"}
                </Button>
                <Link to={'/login'}>Already have an account?</Link>
            </Form>
        </div>
    );
}

export default SignUp;
