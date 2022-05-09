// #region "Importing stuff"
import { FC, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css"
import { useDispatch, useSelector } from "react-redux"
import {RootState} from '../../main/store/redux/rootState'
import onLogin from "../../main/store/stores/user/login.store.on-login"
import { setUserNameLogin, setPasswordLogin } from "../../main/store/stores/login/login.store"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from "react-toastify";
// #endregion


const LoginPage : FC = ()=>{


    // #region "Using react hooks and other stuff"
    const navigate = useNavigate()
    const theme = createTheme()
    const dispatch = useDispatch();
    // #endregion


    // #region "Redux state"
    const userName = useSelector((state: RootState) => state.login.userName);
    const password = useSelector((state: RootState) => state.login.password);
    // #endregion


    // #region "Event listeners"
    function handleSubmit(e: any) {
                            
        e.preventDefault()

        const data = {
            userName,
            password
        }

        dispatch(onLogin(data))

    }
    // #endregion

    
    // #region "Helpers and other stuff"
    const notify = () => toast.success("Welcome")
    // #endregion


    return (

        <div className="login-wrapper-upper">

            {
                // #region "Old Login"
            }

            {/* <div className="login-page-wrapper">

                <div className="login-main-wrapper">

                    <form
                        id="login-form"

                        onSubmit={function (e) {
                            
                            e.preventDefault()

                            const data = {
                                userName,
                                password
                            }

                            dispatch(onLogin(data))
                            // navigate("../dashboard");

                        }}
                    >

                        <h1>Bank System</h1>

                        <label htmlFor="">

                            <input
                                type="text"
                                name="usernameLogin"
                                placeholder="Enter your userName: "
                                required
                                
                                onChange={function (e) {
                                    dispatch(setUserNameLogin(e.target.value))
                                }}
                            />

                        </label>

                        <label htmlFor="">

                            <input
                                type="password"
                                name="passwordLogin"
                                placeholder="Enter your password"
                                required
                                
                                onChange={function (e) {
                                    dispatch(setPasswordLogin(e.target.value))
                                }}
                            />

                        </label>

                        <label htmlFor="">
                            <button>Log In</button>
                        </label>

                        <label id="signup-link-wrapper" htmlFor="">

                            Don't have an account?{" "}

                            <Link id="link" to={"../register"}>

                                Sign Up

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
                            marginTop: 30,
                            display: 'flex',
                            flexDirection: 'column',
                            placeItems: 'center',
                            placeContent: 'center'
                        }}
                    >

                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box >

                            <TextField
                                onChange={(e) =>  dispatch(setUserNameLogin(e.target.value))}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="User Name"
                                name="userName"
                                autoComplete="email"
                                autoFocus
                            />

                            <TextField
                                onChange={(e) => dispatch(setPasswordLogin(e.target.value))}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Button onClick={(e) => {

                                handleSubmit(e)

                                if (handleSubmit) {
                                    notify()
                                }

                            }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >

                                Sign In

                            </Button>

                            <Grid container>

                                <Grid item>
                                    
                                    {/* <Link to="/register" variant="body2" onClick={() => { navigate("/register") }}>
                                        {"Don't have an account? Sign Up"}
                                    </Link> */}

                                    <Link to="/register">
                                        {"Don't have an account? Sign Up"}
                                    </Link>

                                </Grid>

                            </Grid>

                        </Box>

                    </Box>

                </Container>

            </ThemeProvider>
            
        </div>

    )
    
}

export default LoginPage