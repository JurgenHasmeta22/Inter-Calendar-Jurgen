import React from "react";
import "./CalendarTest.css"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

import events from "./events";
import HeaderCommon from "../../main/components/Common/HeaderCommon/HeaderCommon";
import FooterCommon from "../../main/components/Common/FooterCommon/FooterCommon";

export default function CalendarTest() {

  return (

    <>

      <HeaderCommon />

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

      <FooterCommon />

    </>

  )

}