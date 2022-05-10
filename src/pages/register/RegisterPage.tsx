// #region "Importing stuff, components and also importing pieces of state etc"
import { FC, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./RegisterPage.css"
import {RootState} from '../../main/store/redux/rootState'
import { navigateTo } from "../../main/store/stores/navigation/navigation.store"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../main/store/stores/user/user.store"
import onRegister from "../../main/store/stores/user/register.store.on-register"
import { useRadioGroup } from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { 
    setFirstName, 
    setLastName, 
    setEmailRegister, 
    setBio,
    setAddress,
    setIsDoctor,
    setPhoneNumber,
    setUserNameRegister,
    setPasswordRegister,
    setAvatar
} from "../../main/store/stores/register/register.store"

import IRegister from "../../main/interfaces/IRegister"
import IUser from "../../main/interfaces/IUser"

import AuthManager from "../../main/utils/authManager"
// #endregion 


const RegisterPage : FC = ()=> {


    // #region "Using react hooks and other stuff"
    const navigate = useNavigate()
    const theme = createTheme()
    const dispatch = useDispatch();
    // #endregion


    // #region "Getting the state from redux toolkiit with using use Selector"
    const firstName = useSelector((state: RootState) => state.registration.firstName);
    const lastName = useSelector((state: RootState) => state.registration.lastName);
    const userName = useSelector((state: RootState) => state.registration.userName);
    const bio = useSelector((state: RootState) => state.registration.bio);
    const address = useSelector((state: RootState) => state.registration.address);
    const phone = useSelector((state: RootState) => state.registration.phone);
    const email = useSelector((state: RootState) => state.registration.email);
    const password = useSelector((state: RootState) => state.registration.password);
    const isDoctor = useSelector((state: RootState) => state.registration.isDoctor);
    const avatar = useSelector((state: RootState) => state.registration.avatar);
    // #endregion
    
    
    // #region "Form Register event handler"
    const registerData: IUser = {
        userName,
        email,
        password,
        firstName,
        lastName,
        address,
        bio,
        phone,
        avatar,
        isDoctor
    }

    const handleRegisterUser = () => {

        fetch('http://localhost:4000/sign-up', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(registerData)
        
        })
        .then(resp => resp.json())
        .then(data => {
            // dispatch(setUser(data))
            // console.log(data)
        })

    }
    // #endregion


    return (

        <>

            {
                // #region "Old Login"
            }

            {/* <div className="signup-page-wrapper">

                <div className="main-wrapper">

                    <form id="signup-form" onSubmit={function (e) {
                        e.preventDefault()
                        dispatch(onRegister(registerData))
                        // handleRegisterUser(e)
                        // navigate("../dashboard");
                    }}>
                        
                        <h1>Bank System</h1>

                        <label id="firstname" htmlFor="">

                            <input type="text" name = "firstName" placeholder="Enter your firstname" required onChange={function (e) {
                                dispatch(setFirstName(e.target.value))
                            }}/>

                        </label>

                        <label id="lastname" htmlFor="">

                            <input type="text" name = "lastName" placeholder="Enter your lastname" required onChange={function (e) {
                                dispatch(setLastName(e.target.value))
                            }}/>

                        </label>

                        <label id="username" htmlFor="">

                            <input type="text" name = "username" placeholder="Enter your username" required onChange={function (e) {
                                dispatch(setUserNameRegister(e.target.value))
                            }}/>

                        </label>

                        <label htmlFor="">

                            <input type="text" name = "email" id="email" placeholder="Enter your email" onChange={function (e) {
                                dispatch(setEmailRegister(e.target.value))
                            }}/>

                        </label>

                        <label id="username" htmlFor="">

                            <input type="phone" name = "phone" placeholder="Enter your phone number" required onChange={function (e) {
                                dispatch(setPhoneNumber(e.target.value))
                            }}/>

                        </label>

                        <label id="username" htmlFor="">

                            <input type="date" name = "birthdate" placeholder="Enter your birthday" required onChange={function (e) {
                                dispatch(setBirthDate(e.target.value))
                            }}/>

                        </label>

                        <label htmlFor="">
                            
                            <input
                                type="password"
                                name = "password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                onChange={function (e) {
                                    dispatch(setPasswordRegister(e.target.value))
                                }}
                            />

                        </label>

                        <label htmlFor="">
                            <button>Sign Up</button>
                        </label>

                        <label id="login-link-wrapper" htmlFor="">

                            You have an account?

                            <Link id="link" to={"../login"}>
                                Log In
                            </Link>
                            
                        </label>

                    </form>

                </div>

            </div> */}

            {
                // #endregion
            }

            <ThemeProvider theme={theme}>

                <Container component="main" maxWidth="xs">

                    <CssBaseline />

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <Box component="form" noValidate onSubmit={function (e: any) { 
                            e.preventDefault() 
                            // handleRegisterUser() 
                            dispatch(AuthManager.register(registerData))
                        }} sx={{ mt: 8, mb: 8 }}>

                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={6}>

                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e: any) => {
                                            dispatch(setFirstName(e.target.value))
                                        }}
                                    />

                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(e: any) => {
                                            dispatch(setLastName(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e: any) => {
                                            dispatch(setEmailRegister(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="bio"
                                        label="bio"
                                        name="bio"
                                        autoComplete="bio"
                                        onChange={(e: any) => {
                                            dispatch(setBio(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone"
                                        label="phone"
                                        name="phone"
                                        autoComplete="phone"
                                        onChange={(e: any) => {
                                            dispatch(setPhoneNumber(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={(e: any) => {
                                            dispatch(setUserNameRegister(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="address"
                                        label="address"
                                        type="address"
                                        id="address"
                                        autoComplete="address"
                                        onChange={(e: any) => {
                                            dispatch(setAddress(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="avatar"
                                        label="avatar"
                                        type="avatar"
                                        id="avatar"
                                        autoComplete="avatar"
                                        onChange={(e: any) => {
                                            dispatch(setAvatar(e.target.value))
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>

                                    <FormControl>

                                        <Grid item xs={12}>

                                            <FormLabel id="demo-controlled-radio-buttons-group">Are you a doctor: </FormLabel>
                                            
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                
                                                value = {isDoctor}
                                                
                                                onChange={(e: any) => {
                                                    dispatch(setIsDoctor((e.target.value)))
                                                }}

                                                // sx={{
                                                //     marginTop: 8,
                                                //     display: 'flex',
                                                //     flexDirection: 'column',
                                                //     alignItems: 'center',
                                                // }}

                                            >
                                                <FormControlLabel value="false" control={<Radio />} label="false" />
                                                <FormControlLabel value="true" control={<Radio />} label="true" />
                                            </RadioGroup>

                                        </Grid>

                                    </FormControl>
                                    
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e: any) => {
                                            dispatch(setPasswordRegister(e.target.value))
                                        }}
                                    />
                                </Grid>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>

                            <Grid container justifyContent="flex-end">

                                <Grid item onClick={() => {
                                    navigate("/dashboard")
                                }}>

                                    {/* <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link> */}

                                    <Link to="/login">
                                        Already have an account? Sign in
                                    </Link>

                                </Grid>

                            </Grid>

                        </Box>

                    </Box>

                </Container>

            </ThemeProvider>

        </>

    )
    
}

export default RegisterPage