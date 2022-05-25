import * as React from 'react';
import { AppBar, Toolbar, Container, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import AdbIcon from '@mui/icons-material/Adb';
import userSlice from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import classes from './Navbar.module.css';

const ResponsiveAppBar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const authSlice = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(userSlice.actions.logout())
        localStorage.removeItem('token')
        navigate('login', { replace: true })
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        console.log(e.currentTarget);
        setAnchorElUser(null);
    };

    const navLinkStyles = {
        fontFamily: 'monospace',
        color: 'black',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        p: '2'
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        E-Beauty
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            {authSlice.isLoggedIn ? <Container className={classes["menu_wrapper"]}>
                                <Typography component={Link} to="/treatments"
                                    sx={navLinkStyles}>
                                    Treatments
                                </Typography>
                                <Typography component={Link} to="/treatments/create" sx={navLinkStyles}>
                                    Create Treatment
                                </Typography>
                            </Container> :
                                <>
                                    <Typography component={Link} to="/login"
                                        sx={navLinkStyles}>
                                        Login
                                    </Typography>
                                    <Typography component={Link} to="/signup"
                                        sx={navLinkStyles}>
                                        Sign Up
                                    </Typography></>}


                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        E-Beauty
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        {authSlice.isLoggedIn ? <>
                            <Typography component={Link} to="/treatments"
                                sx={{
                                    fontFamily: 'monospace',
                                    mr: 0.85,
                                    color: 'white',
                                    textDecoration: 'none',
                                }}>
                                Treatments
                            </Typography>
                            <Typography component={Link} to="/treatments/create" sx={{
                                fontFamily: 'monospace',
                                color: 'white',
                                textDecoration: 'none',
                            }}>
                                Create Treatment
                            </Typography></> :
                            <>
                                <Typography component={Link} to="/login"
                                    sx={{
                                        fontFamily: 'monospace',
                                        mr: 0.85,
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}>
                                    Login
                                </Typography>
                                <Typography component={Link} to="/signup"
                                    sx={{
                                        fontFamily: 'monospace',
                                        mr: 0.85,
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}>
                                    Sign Up
                                </Typography></>}

                    </Box>

                    {authSlice.isLoggedIn && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Options">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" component={Link} to="/dashboard">Dashboard</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" component={Button} onClick={logoutHandler}>Logout</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
