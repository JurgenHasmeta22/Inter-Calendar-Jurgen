// #region "Importing stuff"
import React, { useCallback, useEffect, useState } from "react";
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

import FullCalendar, { DateSelectArg } from "@fullcalendar/react";
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
    setModal,
    setEventsNew,
    setDoctors,
    invalidateDoctors,
    setSelectedDoctorName,
    setSelectedDoctor
} from "../../main/store/stores/dashboard/dashboard.store"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import axios from "axios";
import useGetUser from "../../main/hooks/useGetUser";

import interactionPlugin from "@fullcalendar/interaction";

import TestModal from "../../main/components/Modals/TestModal"
import AddEventModal from "../../main/components/Modals/AddEvent/AppointementModal"
// #endregion


// #region "Some styling for calendar"
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
// #endregion


export default function DashboardPage() {


  // #region "Redux state and hooks"
  const appointements = useSelector((state: RootState) => state.dashboard.appointements);
  const doctors = useSelector((state: RootState) => state.dashboard.doctors);

  const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
  const selectedDoctorName = useSelector((state: RootState) => state.dashboard.selectedDoctorName);

  const eventsNew = useSelector((state: RootState) => state.dashboard.eventsNew);
  const [eventNewState, setEventNewState] = useState<any>([])
  const modal = useSelector((state: RootState) => state.dashboard.modal);

  const user = useGetUser()
  const theme = useTheme()
  const dispatch = useDispatch()
  // #endregion


  // #region "fetching stuff and helpers functions"
  async function getAppointementsFromServer() {
    let result = await (await axios.get(`/appointements`));
    dispatch(setAppointements(result.data))
  }

  async function getDoctorsFromServer() {
    let result = await (await axios.get(`/doctors`));
    dispatch(setDoctors(result.data))
    // dispatch(setSelectedDoctorName(result.data[0].firstName + " " + result.data[0].lastName))
    // dispatch(setSelectedDoctor(result.data[0]))
  }

  useEffect(()=> {
    getAppointementsFromServer()
  }, [])

  useEffect(()=> {
    getDoctorsFromServer()
  }, [])

  const handleOpen = () => dispatch(setModal("appoinment"));
//   const handleClose = () => dispatch(setModal(""));
  // #endregion


  // #region "Creating events"

    let eventGuid = 0
    
    function createEventId() {
        return String(eventGuid++)
    }

    function createEvents() {

        // @ts-ignore
        const acceptedAppointemets = selectedDoctor?.acceptedAppointemets

        // const doctorResult = doctors?.find(doctor => doctor.firstName === selectedDoctorName)
        // const acceptedAppointemets = doctorResult.acceptedAppointemets

        // const postedAppointements: any = [...user?.postedAppointements]

        let returnedArray: any = []

        //@ts-ignore
        // for (const appointement of acceptedAppointemets) {

        if (selectedDoctor === null) return [] //this fixed all the bugs on error boundaries etc etc

        for (const appointement of acceptedAppointemets) {

            const event = {
                title: appointement.title,
                start: appointement.startDate,
                end: appointement.endDate,
                allDay: false,
                editable: user?.id === appointement.user_id,
                color: "#378006",
                className: `${
                    user.id === appointement.user_id ? "my-color-events" : "others-color-events"
                }`
            }

            // returnedArray.push(event)
            // const finalArray = [...returnedArray, event]

            returnedArray = [...returnedArray, event]
            // setEventNewState(finalArray)

        }

        return returnedArray
        
    }

    function handleEventAdd(selectInfo:  any) {

        handleOpen()

        // let title = ('Please enter a new title for your event')
        // let calendarApi = selectInfo.view.calendar

        // calendarApi.unselect() // clear date selection

        // if (title) {

        //     calendarApi.addEvent({

        //         id: createEventId(),
        //         startDate: selectInfo.startDate,
        //         endDate: selectInfo.endDate,
        //         title: selectInfo.title,
        //         description: selectInfo.description,
        //         status: selectInfo.status,
        //         user_id: selectInfo.user_id,
        //         doctor_id: selectInfo.doctor_id,
        //         allDay: false

        //     })

        // }
        
    }

    // function handleDateClick(arg: any) { // bind with an arrow function
    //     alert(arg.dateStr)
    // }

    function handleEventClick(clickInfo: any) {

        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
          clickInfo.event.remove()
        }
    
    }

    const todayDate = () => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
    
        const date = yyyy + "-" + mm + "-" + dd;

        return date;

    };

    // #region "Trying some weird stuff"

    // useCallback( () => {
    //     createEvents()
    // }, [] )

    // useEffect( () => {
    //     createEvents()
    // }, [] )

    // createEvents()
    
    // console.log(newEvents)

    // #endregion

    // #endregion


    // #region "Event listeners for select"
    function handleOnChangeSelect(e:any) {
        dispatch(setSelectedDoctorName(e.target.value))
    }

    function handleOnChangeDoctor(e: any) {

        const newDoctors = [...doctors]
        const doctorFinal = newDoctors.find(doctor => doctor.firstName + " " + doctor.lastName === e.target.value )

        dispatch(setSelectedDoctor(doctorFinal))
        handleOnChangeSelect(e)

    }
    // #endregion


  return (

    <>

      <HeaderCommon />

        {/* {

            openModal === true ? (
                //@ts-ignore
                // <TestModal />
                <AddEventModal />
            ): null

        } */}

      <div className="header-container">

          {

            //@ts-ignore
            user?.isDoctor === false ? (
                <h3 className="dashboard-title">User Dashboard</h3>
            ): (
                <h3 className="dashboard-title">Doctor Dashboard</h3>
            )

          }

      </div>

      {
          
          !user?.isDoctor ? (

            <div className="select-doctor-wrapper">
    
            <span>Choose a doctor from our clicic for an appointement: </span>
    
            <select name="filter-by-sort" id="filter-by-sort" defaultValue={'DEFAULT'}
                onChange={function (e: any) {
                    handleOnChangeDoctor(e)
             }}>
                
                <option value="DEFAULT" disabled> Select Doctor</option>
    
                {
                
                    doctors?.length === 0 ? (
                        <option value="Default">No Doctor to choose</option>
                    ): (
                        
                        //@ts-ignore
                        doctors?.map(doctor =>  
                            <option key={doctor.id} value = {doctor.firstName + " " + doctor.lastName}> {doctor.firstName + " " + doctor.lastName} </option>
                        )
    
                    )
    
                }
    
            </select>
    
            </div>

          ): null

      }


      {

            //@ts-ignore
          user?.isDoctor === false ? (

            <div className="calendar-wrapper">

                <section className="side-bar">
                    <h3 className="side-bar__title">Calendar</h3>
                    <h4 className="my-color-events">My events</h4>
                    <h4 className="others-color-events">Others Events</h4>
                </section>

                <div className="calendar">

                    <FullCalendar

                        initialView = "dayGridMonth"

                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth, timeGridWeek, timeGridDay"
                        }}

                        plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin]}

                        nowIndicator={true}
                        displayEventEnd={true}
                        editable = {true}
                        selectable = {true}
                        eventColor="#50a2fd"
                        selectMirror={true}
                        droppable={true}
                        dayMaxEvents={true}

                        eventDurationEditable={true}

                        validRange={{ start: todayDate(), end: "2023-01-01" }}
                        eventClick={handleEventClick}
                        select = {handleEventAdd}
                        events = {createEvents()}
                        // #endregion

                    />

                    <div className="button-event-wrapper">

                        <button onClick={ function () {
                            // handleOpen()
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