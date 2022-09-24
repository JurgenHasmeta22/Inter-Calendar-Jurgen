import { FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import onLogin from "../../main/store/stores/user/login.store.on-login";
import {
  setPasswordLogin,
  setEmailLogin,
} from "../../main/store/stores/login/login.store";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import useGetUser from "../../main/hooks/useGetUser";
import { motion } from "framer-motion";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const theme = createTheme();
  const dispatch = useDispatch();
  const user = useGetUser();
  const password = useSelector((state: RootState) => state.login.password);
  const emailLogin = useSelector((state: RootState) => state.login.emailLogin);

  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      emailLogin,
      password,
    };
    dispatch(onLogin(data));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 1 } }}
    >
      <div className="login-wrapper-upper">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 10,
                display: "flex",
                flexDirection: "column",
                placeItems: "center",
                placeContent: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box>
                <TextField
                  onChange={(e) => dispatch(setEmailLogin(e.target.value))}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email: "
                  name="email"
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
                <Button
                  onClick={(e) => {
                    handleSubmit(e);
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
    </motion.div>
  );
};

export default LoginPage;
