// #region "Importing stuff"
import React, { useEffect } from "react";
import "./DashboardPage.css"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import events from "./events";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";

import {
    setAppointements,
    invalidateAppointements
} from "../../main/store/stores/dashboard/dashboard.store"

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main/store/redux/rootState";
import axios from "axios";
// #endregion

export default function CalendarTest() {

  // #region "Redux state and hooks"
  const dispatch = useDispatch()
  const appointements = useSelector((state: RootState) => state.dashboard.appointements);
  // #endregion

  // #region "fetching stuff and helpers functions"
  async function getAppointementsFromServer() {
      let result = await (await axios.get(`/appointements`));
      console.log(result.data)
      dispatch(setAppointements(result.data))
  }

  useEffect(()=> {
    getAppointementsFromServer()
  }, [])
  // #endregion

  return (

    <>

      <HeaderCommon />

      <div className="calendar-wrapper">

        <div className="calendar">

            <FullCalendar

                //@ts-ignore
                defaultView="dayGridMonth"

                header={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}

                plugins = {[dayGridPlugin, timeGridPlugin]}
                events = {events}

            />

        </div>

      </div>

      <FooterCommon />

    </>

  )

}