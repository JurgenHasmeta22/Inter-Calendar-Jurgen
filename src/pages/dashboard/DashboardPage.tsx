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
import IAppointement from "../../main/interfaces/IAppointement";
import { setUser } from "../../main/store/stores/user/user.store";

import { motion } from "framer-motion"

import Dashboard from "../../main/components/Dashboard/Dashboard"
import DashboardHeader from "../../main/components/Dashboard/DashboardHeader"
import DashboardSelect from "../../main/components/Dashboard/DashboardSelect"
// #endregion


export default function DashboardPage() {


  // #region "Redux state and hooks"

  const appointements = useSelector((state: RootState) => state.dashboard.appointements);
  const doctors = useSelector((state: RootState) => state.dashboard.doctors);
  const patients = useSelector((state: RootState) => state.dashboard.patients);

  const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
  const [eventClickNew, setEventClickNew] = useState<EventClickArg | null>(null);

  const [appointementIndivid, setAppointementIndivid] = useState<IAppointement | null>(null);

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

  async function getAppointementFromServer() {

    const id = Number(eventClickNew?.event._def.publicId)

    let result = await (await axios.get(`/appointements/${id}`));

    setAppointementIndivid(result.data)

}

useEffect(()=> {

    if (eventClickNew) {
        getAppointementFromServer()
    }

}, [])

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

        let returnedArray: any = []

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
                editable: false, //this blocks the editable of the event even its yours
                allDay: false,
                backgroundColor: `${user.id === appointement.user_id ? color : "#849fb7" || user.id === appointement.doctor_id ? color : "#849fb7"}`,
                overlap: false,
                // editable: user?.id === appointement.user_id || user?.id === appointement.doctor_id,
                className: `${
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

        // find if the user patient has any appointements in this date so we cant allow 2 dates in the same day
        const startDateCheck = changeDateFormat(selectInfo.startStr)

        // @ts-ignore
        const userAppointement = user?.postedAppointements.find(appointement => appointement.startDate.substring(0, 10) === startDateCheck.substring(0, 10))
        
        const startHour  = Number(selectInfo.startStr.substring(11, 13))
        const endHour = Number(selectInfo.endStr.substring(11, 13))

        const checkHour = endHour - startHour

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

                    if (checkHour <= 1 && !userAppointement ) {
                        setSelectInfo(selectInfo);
                        handleOpen()
                    }
                    
                    else {
                        toast.error("You cant have more time than 1 hour and 30 minutes and you cant have 2 appointements in a day")
                    }

                }

            }

            else {

                if (selectInfo.view.type === "timeGridDay" && selectedPatient && !selectedFreeTime) {

                    if (checkHour <= 1) {
                        setSelectInfo(selectInfo);
                        handleOpen()
                    }

                    else {
                        toast.error("You cant have more time than 1 hour and 30 minutes and you cant have 2 appointements in a day")
                    }

                }

                else if (selectInfo.view.type === "timeGridDay" && !selectedPatient && selectedFreeTime) {
                    
                    if (checkHour <= 1) {
                        setSelectInfo(selectInfo);
                        handleOpen()
                    }

                    else {
                        toast.error("You cant have more time than 1 hour and 30 minutes and you cant have 2 appointements in a day")
                    }
                    
                }

                else if (selectInfo.view.type === "timeGridDay" && selectedPatient && selectedFreeTime) {
                    toast.error("You need to either select a patient, or an appointement free but not both of them also with the appointement free")
                    dispatch(setModal(""))
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

    const changeDateFormat = (date: string) => {
        return date.substring(0, date.length - 6);
    };

    // #region "Drag and Drop events"

    async function handleEventDrop(selectInfo: DateSelectArg) {

        console.log("hi")

        setSelectInfo(selectInfo);

        const dataToSend = {
            price: appointementIndivid?.price,
            startDate: changeDateFormat(selectInfo.startStr),
            endDate: changeDateFormat(selectInfo.endStr),
            title: appointementIndivid?.title,
            description: appointementIndivid?.description,
            status: appointementIndivid?.status,
            user_id: appointementIndivid?.user_id,
            doctor_id: appointementIndivid?.doctor_id,
            //@ts-ignore
            doctor_post_id: null,
            category_id: 1
        }

        let result = await (await axios.patch(`appointements/${appointementIndivid?.id}`, dataToSend)).data;

        if (!result.error) {

            dispatch(setSelectedDoctor(result.doctorServer))
            dispatch(setUser(result.patientServer));
            dispatch(setDoctors(result.doctorsServer))

            dispatch(setModal(""))
            toast.success("Succesfully Updated Event");

        }

    }

    function handleEventStart(eventClick: EventClickArg) {
        setEventClickNew(eventClick)
    }

    // #endregion
    
    // #endregion

    
  // #region "Returning HTML JSX"

  return (

    <>

      <HeaderCommon />

      <UserModals
        eventClickNew = {eventClickNew}
        selectInfo = {selectInfo}
      />

      <DashboardHeader />
      
      <DashboardSelect 
        handleOnChangeDoctor = {handleOnChangeDoctor}
        handleOnChangePatient = {handleOnChangePatient}
        handleOnChangeFreeAppointement = {handleOnChangeFreeAppointement}
      />

      <Dashboard 
        handleDateClick = {handleDateClick}
        handleDateSelect = {handleDateSelect}
        handleEventClick = {handleEventClick}
        handleEventStart = {handleEventStart}
        handleEventDrop = {handleEventDrop}
        todayDate = {todayDate}
        createEvents = {createEvents}
        calendarRef = {calendarRef}
        selectInfo = {selectInfo}
        eventClickNew = {eventClickNew}
      />

      <FooterCommon />

    </>

  )

  // #endregion


}