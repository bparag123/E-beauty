import React from 'react';
import { NavbarBrand, NavbarToggler, Collapse, NavLink as ReactNav, Nav, NavItem, Navbar, Button } from 'reactstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import classes from "./Navbar.module.css"
import { useDispatch, useSelector } from "react-redux"
import userSlice from '../../store/slices/userSlice';

const MyNavBar = () => {

    const authSlice = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(userSlice.actions.logout())
        localStorage.removeItem('token')
        navigate('login', { replace: true })
    }

    return (
        <div>
            <div>
                <Navbar
                    color="primary"
                    expand="md"
                    light
                >
                    <NavbarBrand>
                        <NavLink className={classes['navlink']} to='/' >E-Beauty</NavLink>
                    </NavbarBrand>
                    <NavbarToggler onClick={function noRefCheck() { }} />
                    <Collapse navbar>
                        <Nav
                            className="me-auto"
                            navbar>

                            {authSlice.isLoggedIn ?
                                <>
                                    <NavItem>
                                        <ReactNav>
                                            <NavLink className={classes['navlink']} to='/treatments'>Treatment</NavLink>
                                        </ReactNav>
                                    </NavItem>
                                    <NavItem>
                                        <ReactNav>
                                            <Button color='danger' onClick={logoutHandler}>Logout</Button>
                                        </ReactNav>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <ReactNav>
                                            <NavLink className={classes['navlink']} to='/login'>Login</NavLink>
                                        </ReactNav>
                                    </NavItem>
                                    <NavItem>
                                        <ReactNav>
                                            <NavLink className={classes['navlink']} to='/SignUp'>SignUp</NavLink>
                                        </ReactNav>
                                    </NavItem>
                                </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div >
    );
}

export default MyNavBar;
