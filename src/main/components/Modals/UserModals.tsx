// import "./style.css";
import AppointementModal from "./AddEvent/AppointementModal"
import DeleteEvent from "./DeleteEvent/DeleteEvent"
import IUser from "../../interfaces/IUser";
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import DeleteModal from "./DeleteEvent/DeleteEvent";

type Props = {
  eventClickNew: EventClickArg;
};

function UserModals({
  eventClickNew
}: Props) {

    const modal = useSelector((state: RootState) => state.dashboard.modal);

  switch (modal) {

    case "appoinment":

      return (
        <AppointementModal />
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