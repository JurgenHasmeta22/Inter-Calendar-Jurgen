// #region "Importing stuff"
import { useDispatch, useSelector } from "react-redux";
import "../Dashboard/Dashboard.css";
import { RootState } from "../../store/redux/rootState";
import useGetUser from "../../hooks/useGetUser/index";
import { useTheme } from "@emotion/react";

import FullCalendar, {
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { setModal } from "../../store/stores/dashboard/dashboard.store";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { motion } from "framer-motion";
import { Tooltip } from "bootstrap";

import "../Dashboard/Dashboard.css";
// #endregion

// let tooltipInstance:any = null;

export default function Dashboard({
  handleDateClick,
  // handleEventDrop,
  // handleEventStart,
  handleEventClick,
  handleDateSelect,
  todayDate,
  createEvents,
  eventClickNew,
  selectInfo,
  calendarRef,
  tooltipInstance,
}: any) {
  // #region "Redux state and other react hooks"
  const selectedDoctor = useSelector(
    (state: RootState) => state.dashboard.selectedDoctor
  );
  const selectedPatient = useSelector(
    (state: RootState) => state.dashboard.selectedPatient
  );
  const selectedFreeTime = useSelector(
    (state: RootState) => state.dashboard.selectedFreeTime
  );

  const user = useGetUser();
  const dispatch = useDispatch();
  // #endregion

  // #region "Tooltip events functions"
  const handleMouseEnter = (info: any) => {
    if (info.event.extendedProps.description) {
      tooltipInstance = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        html: true,
        placement: "top",
        trigger: "hover",
        container: "body",
        customClass: "tooltip-hover",
      });

      tooltipInstance.show();
    }
  };

  const handleMouseLeave = (info: any) => {
    if (tooltipInstance) {
      tooltipInstance.dispose();
      tooltipInstance = null;
    }
  };
  // #endregion

  // #region "Returning HTML in JSX"
  return (
    <>
      {
        // #region "Dashboard Calendar"
      }

      <div className="calendar-wrapper">
        <motion.section
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 1, duration: 2 } }}
          className="side-bar"
        >
          <section className="side-bar">
            <h3 className="side-bar__title">Calendar Legenda</h3>

            {!user?.isDoctor ? (
              <h4 className="others-color-events">Others Events</h4>
            ) : null}

            <ul className="event-list">
              <li>
                {!user?.isDoctor ? (
                  <h4>
                    Patient user events{" "}
                    <span>Total: {user.postedAppointements.length}</span>
                  </h4>
                ) : (
                  <h4>
                    Doctor events <span>Total: {createEvents().length}</span>
                  </h4>
                )}
              </li>

              <li className="event-list__item pending">
                Pending
                <span>
                  {!user?.isDoctor
                    ? user.postedAppointements.filter((event: any) =>
                        event.status.includes("pending")
                      ).length
                    : selectedDoctor?.acceptedAppointemets.filter(
                        (event: any) => event.status.includes("pending")
                      ).length}
                </span>
              </li>

              <li className="event-list__item approved">
                Approved
                <span>
                  {!user?.isDoctor
                    ? user.postedAppointements.filter((event: any) =>
                        event.status.includes("approved")
                      ).length
                    : selectedDoctor?.acceptedAppointemets.filter(
                        (event: any) => event.status.includes("approved")
                      ).length}
                </span>
              </li>

              <li className="event-list__item cancelled">
                Refused
                <span>
                  {!user?.isDoctor
                    ? user?.postedAppointements.filter((event: any) =>
                        event.status.includes("cancelled")
                      ).length
                    : user?.acceptedAppointemets.filter((event: any) =>
                        event.status.includes("cancelled")
                      ).length}
                </span>
              </li>

              {user?.isDoctor ? (
                <li className="event-list__item free-event">
                  Doctor Free Events
                  <span>
                    {!user?.isDoctor
                      ? selectedDoctor?.freeAppointements.length
                      : user?.freeAppointements.length}
                  </span>
                </li>
              ) : null}

              {user.isDoctor ? (
                <button
                  className="notifications"
                  onClick={function (e) {
                    dispatch(setModal("notification"));
                  }}
                >
                  See Notifications
                  <span>
                    {
                      selectedDoctor?.acceptedAppointemets.filter(
                        (event: any) => event.status.includes("pending")
                      ).length
                    }
                  </span>
                </button>
              ) : null}
            </ul>
          </section>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 850 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
          className="calendar"
        >
          <div className="calendar">
            <FullCalendar
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth, timeGridWeek, timeGridDay, listMonth",
              }}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              nowIndicator={true}
              displayEventEnd={true}
              editable={true}
              selectable={true}
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
              weekNumbers={true}
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
              // eventDragStop = {handleEventDrop}
              // eventDragStart = {handleEventStart}

              // eventMouseEnter={handleMouseEnter}
              // eduart.lushka22
              // eventMouseLeave={handleMouseLeave}

              eventClick={handleEventClick}
              select={handleDateSelect}
              events={createEvents()}
            />
          </div>
        </motion.div>
      </div>

      {
        // #endregion
      }
    </>
  );
  // #endregion
}
