import React from "react";
import "./CalendarTest.css"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import events from "./events";

export default function CalendarTest() {

  return (

    <>

      <FullCalendar

        //@ts-ignore
        defaultView="dayGridMonth"

        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}

        plugins={[dayGridPlugin, timeGridPlugin]}
        events={events}

      />

    </>

  )

}