// #region "Importing stuff"
import React, { useCallback, useEffect, useState } from "react";
import "./DashboardPage.css"

import { useTheme } from '@emotion/react';

import FullCalendar, { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";

import {
    setAppointements,
    setModal,
    setDoctors,
    setSelectedDoctorName,
    setSelectedDoctor,
    setPatients,
    setSelectedPatient,
    setSelectedPatientName,
    setSelectedFreeTime
} from "../../main/store/stores/dashboard/dashboard.store"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import axios from "axios";
import useGetUser from "../../main/hooks/useGetUser";

import interactionPlugin from "@fullcalendar/interaction";

import { toast } from "react-toastify";

import UserModals from "../../main/components/Modals/UserModals"

import listPlugin from '@fullcalendar/list';
// #endregion


// #region "Some styling for calendar"

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: 'background.paper',
//   border: '4px solid #000',
//   boxShadow: 44,
//   p: 8
// };

// #endregion


export default function DashboardPage() {


  // #region "Redux state and hooks"

  const appointements = useSelector((state: RootState) => state.dashboard.appointements);
  const doctors = useSelector((state: RootState) => state.dashboard.doctors);
  const patients = useSelector((state: RootState) => state.dashboard.patients);

  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [eventClickNew, setEventClickNew] = useState<EventClickArg | null>(null);

  let calendarRef = React.createRef();

  const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
  const selectedDoctorName = useSelector((state: RootState) => state.dashboard.selectedDoctorName);

  const selectedPatient = useSelector((state: RootState) => state.dashboard.selectedPatient);
  const selectedPatientName = useSelector((state: RootState) => state.dashboard.selectedPatientName);

  const eventsNew = useSelector((state: RootState) => state.dashboard.eventsNew);
  const [eventNewState, setEventNewState] = useState<any>([])
  const modal = useSelector((state: RootState) => state.dashboard.modal);

  const selectedFreeTime = useSelector((state: RootState) => state.dashboard.selectedFreeTime);

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

    dispatch(setSelectedDoctor(null))
    dispatch(setDoctors(result.data))

    for (const doctor of result.data) {


        if ( ( doctor.id === user?.id ) && user?.isDoctor) {
            dispatch(setSelectedDoctor(doctor))
        }

    }

  }

  async function getPatientsFromServer() {

    let result = await (await axios.get(`/users`));

    dispatch(setSelectedPatient(null))
    dispatch(setPatients(result.data))

    if (!user?.isDoctor) {
        dispatch(setSelectedPatient(user))
    }

  }

  useEffect(()=> {
    getAppointementsFromServer()
  }, [])

  useEffect(()=> {
    getDoctorsFromServer()
  }, [])

  useEffect(()=> {
    getPatientsFromServer()
  }, [])

  const handleOpen = () => dispatch(setModal("appoinment"));

  // #endregion


  // #region "Creating events"

    let eventGuid = 0
    
    function createEventId() {
        return String(eventGuid++)
    }

    function createEvents() {
        
        if (selectedDoctor === null) return [] //this fixed all the bugs on error boundaries etc etc

        // @ts-ignore
        const acceptedAppointemets = selectedDoctor?.acceptedAppointemets
        const freeApointements = selectedDoctor?.freeAppointements

        // console.log(freeApointements)
        // console.log(acceptedAppointemets)

        // const finalAcceptedAppointements = acceptedAppointemets.concat(freeApointements);

        let returnedArray: any = []

        // for (const appointement of finalAcceptedAppointements) {

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
                // backgroundColor: `${user.id === appointement.user_id ? color : "#849fb7" || user.id === appointement.doctor_id ? color : "#849fb7" || user.id === appointement.doctor_post_id ? color : "#849fb7"}`,
                backgroundColor: `${user.id === appointement.user_id ? color : "#849fb7" || user.id === appointement.doctor_id ? color : "#849fb7"}`,
                overlap: false,
                editable: user?.id === appointement.user_id || user?.id === appointement.doctor_id,
                className: `${
                    // ( user.id !== appointement.doctor_id ) && ( user.id !== appointement.user_id) && ( user.id !== appointement.doctor_post_id) ? "others-color-events" : `${appointement.status}`
                    ( user.id !== appointement.doctor_id ) && ( user.id !== appointement.user_id) ? "others-color-events" : `${appointement.status}`
                }`

            }

            returnedArray.push(event);

        }

        for (const appointement of freeApointements) {

            const object = {
              title: appointement.title,
              id: `${appointement.id}`,
              start: appointement.startDate,
              end: appointement.endDate,
              allDay: false,
              editable: false,
              overlap: false,
              backgroundColor: "#8f73b1",
              className: "free-time"
            };

            returnedArray.push(object);

        }

        return returnedArray
        
    }

    const handleEventClick = (eventClick: EventClickArg) => {

        if (!user.isDoctor) {

            if (
                user.postedAppointements.find(
                  (event: any) => event.id === Number(eventClick.event._def.publicId)
                )
              ) {
                setEventClickNew(eventClick)
                // setSelectInfo(selectInfo)
                dispatch(setModal("deleteEvent"));
            }

        }

        else if(user.isDoctor && !selectedFreeTime && selectedPatient) {

            if (
                user.acceptedAppointemets.find(
                  (event: any) => event.id === Number(eventClick.event._def.publicId)
                )
              ) {
                setEventClickNew(eventClick)
                // setSelectInfo(selectInfo)
                dispatch(setModal("deleteEvent"));
            }

        }

        else if(user.isDoctor && !selectedFreeTime && !selectedPatient) {

            if (user.freeAppointements.length !== 0 || user.freeAppointements.length !== 0) {

                if (
                    user.freeAppointements.find(
                      (event: any) => event.id === Number(eventClick.event._def.publicId)
                    ) || user.acceptedAppointemets.find(
                        (event: any) => event.id === Number(eventClick.event._def.publicId)
                      )
                  ) {
                    setEventClickNew(eventClick)
                    // setSelectInfo(selectInfo)
                    dispatch(setModal("deleteEvent"));
                }

            }

            else {

                if (
                    user.acceptedAppointemets.find(
                      (event: any) => event.id === Number(eventClick.event._def.publicId)
                    )
                  ) {
                    setEventClickNew(eventClick)
                    dispatch(setModal("deleteEvent"));
                }

            }

        }

        else if(user.isDoctor && selectedFreeTime) {

            if (
                user.freeAppointements.find(
                  (event: any) => event.id === Number(eventClick.event._def.publicId)
                )
              ) {
                setEventClickNew(eventClick)
                dispatch(setModal("deleteEvent"));
            }

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

    // #endregion


  // #region "Event listeners for select"
    function handleOnChangeSelect(e:any) {
        dispatch(setSelectedDoctorName(e.target.value))
    }

    function handleOnChangeSelectPatient(e:any) {
        dispatch(setSelectedPatientName(e.target.value))
    }

    function handleOnChangeDoctor(e: any) {

        const newDoctors = [...doctors]
        const doctorFinal = newDoctors.find(doctor => doctor.firstName + " " + doctor.lastName === e.target.value )

        dispatch(setSelectedDoctor(doctorFinal))
        handleOnChangeSelect(e)

    }

    function handleOnChangePatient(e: any) {

        const newPatients = [...patients]
        const patientFinal = newPatients.find(pattient => pattient.firstName + " " + pattient.lastName === e.target.value )

        if (e.target.value === "DEFAULT") {
            dispatch(setSelectedPatient(null))
        }

        else {
            dispatch(setSelectedPatient(patientFinal))
            handleOnChangeSelectPatient(e)
        }

    }

    const handleDateSelect = (selectInfo: DateSelectArg) => {

        if (!user?.isDoctor && !selectedDoctor) {
            toast.warn("Please select a doctor to choose an appointement")
        }

        else if (user?.isDoctor && !selectedPatient && !selectedFreeTime) {
            toast.warn("Please select a patient to choose an appointement")
        }

        else {

            //@ts-ignore
            let calendarApi = calendarRef.current.getApi();
            
            calendarApi.changeView("timeGridDay", selectInfo.startStr);

            if (!user.isDoctor) {

                if (selectInfo.view.type === "timeGridDay" && selectedDoctor ) {
                    setSelectInfo(selectInfo);
                    handleOpen()
                }

            }

            else {

                if (selectInfo.view.type === "timeGridDay" && selectedPatient && !selectedFreeTime) {
                    setSelectInfo(selectInfo);
                    handleOpen()
                }

                else if (selectInfo.view.type === "timeGridDay" && !selectedPatient && selectedFreeTime) {
                    setSelectInfo(selectInfo);
                    handleOpen()
                }

            }
        
        }

    };

    function handleOnChangeFreeAppointement(e: any) {

        if (e.target.value === "false") {
            dispatch(setSelectedFreeTime(false))
        }

        else if (e.target.value === "true") {
            dispatch(setSelectedFreeTime(true))
        }

    }
    // #endregion


  // #region "Returning HTML JSX"

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

            // #region "User Select"
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
            // #endregion

          ): (

            // #region "Doctor Select"
            <div className="select-doctor-wrapper">
    
                <span>Choose a patient from our clicic for an appointement: </span>
    
                <select name="filter-by-sort" id="filter-by-sort" defaultValue={'DEFAULT'}
                    onChange={function (e: any) {
                        handleOnChangePatient(e)
                }}>
                    
                    <option value="DEFAULT"> Select Patient</option>
        
                    {
                    
                        doctors?.length === 0 ? (
                            <option value="Default">No Patient to choose</option>
                        ): (
                            
                            //@ts-ignore
                            patients?.map(patient =>  
                                <option key={patient.id} value = {patient.firstName + " " + patient.lastName}> {patient.firstName + " " + patient.lastName} </option>
                            )
        
                        )
        
                    }
        
                </select>

                <span>Appointement Free: </span>
    
                <select name="filter-by-sort" id="filter-by-sort" defaultValue={'false'}
                    onChange={function (e: any) {
                        handleOnChangeFreeAppointement(e)
                }}>
                    
                    <option value="false">No</option>
                    <option value="true">Yes</option>

                </select>
    
            </div>
            // #endregion

        )

      }


      {

            //@ts-ignore
          user?.isDoctor === false ? (

            // #region "User Dashboard Calendar"
            <div className="calendar-wrapper">

                <section className="side-bar">
                    
                    <h3 className="side-bar__title">Calendar Legenda</h3>
                    <h4 className="others-color-events">Others Events</h4>

                    <ul className="event-list">

                        <li>

                            <h4>
                                Patient user events <span>Total: {user.postedAppointements.length}</span>
                            </h4>

                        </li>

                        <li className="event-list__item pending">

                            Pending

                            <span>

                                {
                                    user.postedAppointements.filter((event: any) =>
                                        event.status.includes("pending")
                                    ).length
                                }

                            </span>

                        </li>

                        <li className="event-list__item approved">

                            Approved

                            <span>

                                {
                                    user.postedAppointements.filter((event: any) =>
                                        event.status.includes("approved")
                                    ).length
                                }

                            </span>

                        </li>

                        <li className="event-list__item cancelled">

                            Refused

                            <span>

                                {
                                    user.postedAppointements.filter((event: any) =>
                                        event.status.includes("cancelled")
                                    ).length
                                }

                            </span>

                        </li>

                        <li className="event-list__item free-event">

                            Doctor Free Events

                            <span>

                                {
                                    selectedDoctor?.freeAppointements.length
                                }

                            </span>

                        </li>

                    </ul>

                </section>

                <div className="calendar">

                    <FullCalendar

                        initialView = "dayGridMonth"

                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth"
                        }}

                        plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

                        nowIndicator={true}
                        displayEventEnd={true}
                        editable = {true}
                        selectable = {true}
                        selectMirror={true}

                        weekends={false}
                        height="auto"
                        
                        eventTimeFormat={{
                            hour: "2-digit", //2-digit, numeric
                            minute: "2-digit", //2-digit, numeric
                            hour12: false, //true, false
                        }}

                        slotMinTime={"08:00:00"}
                        slotMaxTime={"16:00:00"}
                        allDaySlot={false}

                        //@ts-ignore
                        ref={calendarRef}
                        dayMaxEvents={true}
                        dateClick={handleDateClick}
                        eventDurationEditable={true}
                        weekNumbers = {true}
                        validRange={{ start: todayDate(), end: "2023-01-01" }}

                        selectOverlap={() => {

                            //@ts-ignore
                            let calendarApi = calendarRef.current.getApi();
                            
                            if (calendarApi.view.type === "timeGridDay") {
                              return false;
                            }

                            return true;

                        }}

                        selectAllow={(selectInfo) => {

                            let startDate = selectInfo.start;
                            let endDate = selectInfo.end;

                            endDate.setSeconds(endDate.getSeconds() - 1); // allow full day selection
                            
                            if (startDate.getDate() === endDate.getDate()) {
                                return true;
                            }

                            return false;

                        }}

                        eventClick={handleEventClick}
                        select = {handleDateSelect}
                        events = {createEvents()}

                    />

                </div>

            </div>
            // #endregion

        ): (

            // #region "Doctor Dashboard Calendar"
            <div className="calendar-wrapper">

                <section className="side-bar">
                    
                    <h3 className="side-bar__title">Calendar Legenda</h3>

                    <ul className="event-list">

                        <li>

                            <h4>
                                Doctor events <span>Total: {createEvents().length}</span>
                            </h4>

                        </li>

                        <li className="event-list__item pending">

                            Pending

                            <span>

                                {
                                    selectedDoctor?.acceptedAppointemets.filter((event: any) =>
                                        event.status.includes("pending")
                                    ).length
                                }

                            </span>

                        </li>

                        <li className="event-list__item approved">

                            Approved

                            <span>

                                {

                                    selectedDoctor?.acceptedAppointemets.filter((event: any) =>
                                        event.status.includes("approved")
                                    ).length

                                }

                            </span>

                        </li>

                        <li className="event-list__item cancelled">

                            Refused

                            <span>

                                {

                                    user.acceptedAppointemets.filter((event: any) =>
                                        event.status.includes("cancelled")
                                    ).length

                                }

                            </span>

                        </li>

                        <li className="event-list__item free-event">

                            Doctor Free Events

                            <span>

                                {
                                    user.freeAppointements.length
                                }

                            </span>

                        </li>

                        <button className="notifications" onClick={function (e) {
                            dispatch(setModal("notification"))
                        }}>
                            
                            See Notifications

                            <span>

                                {

                                    selectedDoctor?.acceptedAppointemets.filter((event: any) =>
                                        event.status.includes("pending")
                                    ).length
                                    
                                }

                            </span>

                        </button>

                    </ul>

                </section>

                <div className="calendar">

                    <FullCalendar

                        initialView = "dayGridMonth"

                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth"
                        }}

                        plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}

                        nowIndicator={true}
                        displayEventEnd={true}
                        editable = {true}
                        selectable = {true}
                        selectMirror={true}

                        // droppable={true}

                        weekends={false}

                        // selectOverlap={false}

                        //@ts-ignore
                        ref={calendarRef}
                        dayMaxEvents={true}
                        dateClick={handleDateClick}
                        eventDurationEditable={true}
                        validRange={{ start: todayDate(), end: "2023-01-01" }}
                        
                        eventTimeFormat={{
                            hour: "2-digit", //2-digit, numeric
                            minute: "2-digit", //2-digit, numeric
                            hour12: false, //true, false
                        }}

                        slotMinTime={"08:00:00"}
                        slotMaxTime={"16:00:00"}
                        allDaySlot={false}
                        height="auto"

                        weekNumbers = {true}
                        

                        selectOverlap={() => {

                            //@ts-ignore
                            let calendarApi = calendarRef.current.getApi();
                            
                            if (calendarApi.view.type === "timeGridDay") {
                              return false;
                            }

                            return true;

                        }}

                        selectAllow={(selectInfo) => {

                            let startDate = selectInfo.start;
                            let endDate = selectInfo.end;

                            endDate.setSeconds(endDate.getSeconds() - 1); // allow full day selection
                            
                            if (startDate.getDate() === endDate.getDate()) {
                                return true;
                            }

                            return false;

                        }}

                        eventClick={handleEventClick}
                        select = {handleDateSelect}
                        events = {createEvents()}

                    />

                </div>

            </div>
            // #endregion

        )

      }

      <FooterCommon />

    </>

  )

  // #endregion


}