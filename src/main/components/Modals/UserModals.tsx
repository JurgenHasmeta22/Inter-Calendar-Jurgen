// import "./style.css";
import AppointementModal from "./AddEvent/AppointementModal"
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import DeleteModal from "./DeleteEvent/DeleteEvent";
import "../Modals/Modals.css"

type Props = {
  eventClickNew: EventClickArg;
  selectInfo: any
};

function UserModals({
  eventClickNew,
  selectInfo
}: Props) {

    const modal = useSelector((state: RootState) => state.dashboard.modal);

  switch (modal) {

    case "appoinment":

      return (
        <AppointementModal 
          selectInfo = {selectInfo}
        />
      );

    case "deleteEvent":

      return (
        <DeleteModal
          eventClickNew = {eventClickNew}
        />

      );

    default:
      return null;

  }

}

export default UserModals;