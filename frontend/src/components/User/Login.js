import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useFormik } from 'formik'
import loginSchema from '../../schema/login.schema';
import classes from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/custom-actions'

const Login = () => {
    console.log("Component Rendered");
    const authSlice = useSelector(state => state.user)
    // const [isLoggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            dispatch(loginUser(values))
        },
        validationSchema: loginSchema
    })

    return (
        <div >
            <Form inline onSubmit={formik.handleSubmit} className={classes['loginForm']}>
                <FormGroup floating>
                    <Input
                        id="exampleEmail"
                        placeholder="Email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    <Label for="exampleEmail">
                        Email
                    </Label>
                </FormGroup>
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}
                <FormGroup floating>
                    <Input
                        id="examplePassword"
                        placeholder="Password"
                        type="password"
                        {...formik.getFieldProps("password")}
                    />
                    <Label for="examplePassword">
                        Password
                    </Label>
                </FormGroup>
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}
                <Button type='Submit' color='primary'>
                    Login
                </Button>
                <h3>{authSlice.isLoggedIn && "You are Authenticated"}</h3>
            </Form >
        </div>
    );
}

export default Login;
