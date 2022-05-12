// #region "Importing stuff"
import * as React from 'react';
import Modal from '@mui/material/Modal';

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
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/redux/rootState"

import {
    setModal
} from "../../store/stores/dashboard/dashboard.store"
// #endregion

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '4px solid #000',
  boxShadow: 44,
  p: 8
};

export default function TestModal() {

    // const [open, setOpen] = React.useState(false);
    const openModal = useSelector((state: RootState) => state.dashboard.modal);

    const theme = useTheme()
    const dispatch = useDispatch()

    // const handleOpen = () => dispatch(setOpen(true));
    const handleClose = () => dispatch(setModal(""));

    return (

        <div className='modal-wrapper'>

            {/* <Button onClick={handleOpen}>Open modal test</Button> */}

            {/* <Modal
                keepMounted
                open = {openModal}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >

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
                                Add Event
                            </Typography>

                            <Box component="form" noValidate onSubmit={function (e: any) { 
                                
                            }} sx={{ mt: 8, mb: 8 }}>

                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>

                                        <TextField
                                            autoComplete="given-price"
                                            name="price"
                                            required
                                            fullWidth
                                            id="price"
                                            label="Price of Appointement: "
                                            autoFocus
                                            onChange={(e: any) => {
                                            }}
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="description"
                                            label="Desc: "
                                            name="description"
                                            autoComplete="family-name"
                                            onChange={(e: any) => {
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

                                    Add event
                                    
                                </Button>

                            </Box>

                        </Box>

                    </Container>

                </ThemeProvider>

            </Modal> */}

        </div>

  );

}