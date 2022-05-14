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

import FullCalendar, { DateSelectArg, EventClickArg } from "@fullcalendar/react";
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
    setSelectedDoctor,
    setSelectInfo,
    setEventClick
} from "../../main/store/stores/dashboard/dashboard.store"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import axios from "axios";
import useGetUser from "../../main/hooks/useGetUser";

import interactionPlugin from "@fullcalendar/interaction";

import TestModal from "../../main/components/Modals/TestModal"
import AddEventModal from "../../main/components/Modals/AddEvent/AppointementModal"
import { toast } from "react-toastify";

import UserModals from "../../main/components/Modals/UserModals"
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

  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [eventClickNew, setEventClickNew] = useState<EventClickArg | null>(null);

  let calendarRef = React.createRef();

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
  }

  useEffect(()=> {
    getAppointementsFromServer()
  }, [])

  useEffect(()=> {
    getDoctorsFromServer()
  }, [])

  const handleOpen = () => dispatch(setModal("appoinment"));
  // #endregion


  // #region "Creating events"

    let eventGuid = 0
    
    function createEventId() {
        return String(eventGuid++)
    }

    function createEvents() {

        // @ts-ignore
        const acceptedAppointemets = selectedDoctor?.acceptedAppointemets

        let returnedArray: any = []

        if (selectedDoctor === null) return [] //this fixed all the bugs on error boundaries etc etc

        for (const appointement of acceptedAppointemets) {

            let color = "";

            switch (appointement.status) {

                case "approved":
                    color = "#39c32f";
                    break;

                case "cancelled":
                    color = "#d01212";
                    break;

                default:
                    color = "#fc9605";

            }

            const event = {

                id: `${appointement.id}`,
                title: appointement.title,
                start: appointement.startDate,
                end: appointement.endDate,
                allDay: false,
                // backgroundColor: `${user.id === appointement.user_id ? color : "#849fb7"}`,
                color: "#378006",
                overlap: false,
                editable: user?.id === appointement.user_id,
                className: `${
                    user.id !== appointement.user_id ? "others-color-events" : `${appointement.status}`
                }`

            }

            // returnedArray = [...returnedArray, event]
            returnedArray.push(event);

        }

        // console.log(returnedArray) idk where the bugs is this works

        return returnedArray
        
    }

    function handleEventAdd(selectInfo:  any) {

        if (selectedDoctor) {
            setSelectInfo(selectInfo)
            handleOpen()
        }
        
    }

    const handleEventClick = (eventClick: EventClickArg) => {

        if (selectedDoctor?.acceptedAppointemets.find((event: any) => event.user_id === user.id)) {
            setEventClickNew(eventClick)
            dispatch(setModal("deleteEvent"));
        }

    };

    const todayDate = () => {

        let today = new Date();

        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
    
        const date = yyyy + "-" + mm + "-" + dd;

        return date;

    };

    const handleDateClick = (info: any) => {};

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

    const handleDateSelect = (selectInfo: DateSelectArg) => {

        if (!selectedDoctor) {
            toast.warn("Please select a doctor to choose an appointement")
        }

        else {

            //@ts-ignore
            let calendarApi = calendarRef.current.getApi();
            
            calendarApi.changeView("timeGridDay", selectInfo.startStr);

            if (selectInfo.view.type === "timeGridDay" && selectedDoctor) {
                setSelectInfo(selectInfo);
                handleOpen()
            }
        
        }

    };
    // #endregion


  return (

    <>

      <HeaderCommon />

      <UserModals
        eventClickNew = {eventClickNew}
        selectInfo = {selectInfo}
      />

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
                        selectMirror={true}
                        droppable={true}
                        weekends={false}
                        //@ts-ignore
                        ref={calendarRef}
                        dayMaxEvents={true}
                        dateClick={handleDateClick}
                        eventDurationEditable={true}
                        validRange={{ start: todayDate(), end: "2023-01-01" }}
                        eventClick={handleEventClick}
                        select = {handleDateSelect}
                        events = {createEvents()}
                        // #endregion

                    />

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