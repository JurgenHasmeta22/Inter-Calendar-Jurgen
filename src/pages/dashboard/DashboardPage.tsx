// #region "Importing stuff"
import React, { useCallback, useEffect } from "react";
import "./DashboardPage.css"

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

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import events from "./events";

import {
    getDate
} from "./events"

import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";

import {
    setAppointements,
    invalidateAppointements,
    setOpen,
    setEventsNew
} from "../../main/store/stores/dashboard/dashboard.store"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import axios from "axios";
import useGetUser from "../../main/hooks/useGetUser";
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


export default function DashboardPage() {


  // #region "Redux state and hooks"
  const appointements = useSelector((state: RootState) => state.dashboard.appointements);
  const eventsNew = useSelector((state: RootState) => state.dashboard.eventsNew);

  const openModal = useSelector((state: RootState) => state.dashboard.openModal);

  const user = useGetUser()

  const theme = useTheme()
  const dispatch = useDispatch()
  // #endregion


  // #region "fetching stuff and helpers functions"

  async function getAppointementsFromServer() {
    let result = await (await axios.get(`/appointements`));
    dispatch(setAppointements(result.data))
  }

  useEffect(()=> {
    getAppointementsFromServer()
  }, [])

  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  // #endregion


    // #region "Creating events"

    let newEvents: any = []

    function createEvents() {

        // console.log("hi")

        for (const appointement of appointements) {

            const event = {
                id: appointement.id,
                title: appointement.title,
                start: getDate(appointement.startDate),
                end: getDate(appointement.endDate)
            }

            // console.log(event)

            // newEvents.push(event)

            newEvents = [...newEvents, event]

            // console.log(newArray)

            // dispatch(setEventsNew(newArray)) se di pse error me state ktu

        }
        
    }

    // useCallback( () => {
    //     createEvents()
    // }, [] )

    // useEffect( () => {
    //     createEvents()
    // }, [] )

    createEvents()
    
    console.log(newEvents)

    // #endregion


  return (

    <>

      <HeaderCommon />

      {

            //@ts-ignore
          user?.isDoctor === false ? (

            <div className="calendar-wrapper">

                <div className="calendar">

                    <FullCalendar

                        // defaultView="dayGridMonth"

                        initialView = "dayGridMonth"
                        
                        // editable={true}
                        // selectable={true}
                        // selectMirror={true}
                        // dayMaxEvents={true}

                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth, timeGridWeek, timeGridDay"
                        }}

                        plugins = {[dayGridPlugin, timeGridPlugin]}

                        nowIndicator={true}
                        allDayText="All Day"
                        
                        // allDayDefault={false}
                        // locale='ko'
                        timeZone='UTC'

                        events = {newEvents}

                    />

                    <div className="button-event-wrapper">

                        <button onClick={ function () {
                            handleOpen()
                        }}>Add Event</button>

                    </div>

                </div>

            </div>

        ): (

            <div className="calendar-doctor">
                <span>Doctor here test</span>
            </div>

        )

      }

      <FooterCommon />

    </>

  )

}


// #region "Stuff modal for moment nope"
{/* <div className='modal-wrapper'> */}

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

</Modal>

</div> */}
// #endregion