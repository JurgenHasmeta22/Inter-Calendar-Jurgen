import AppointementModal from "./AddEvent/AppointementModal";
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import DeleteModal from "./DeleteEvent/DeleteEvent";
import "../Modals/Modals.css";
import EditEvent from "../../components/Modals/EditEvent/EditEvent";
import NotificationEvent from "../Modals/NotificationEvent/NotificationEvent";
import ViewEvent from "../Modals/ViewEvent/ViewEvent";

type Props = {
  eventClickNew: EventClickArg;
  selectInfo: any;
};

function UserModals({ eventClickNew, selectInfo }: Props) {
  const modal = useSelector((state: RootState) => state.dashboard.modal);

  switch (modal) {
    case "appoinment":
      return <AppointementModal selectInfo={selectInfo} />;
    case "deleteEvent":
      return <DeleteModal eventClickNew={eventClickNew} />;
    case "notification":
      return <NotificationEvent />;
    case "edit":
      return (
        <EditEvent eventClickNew={eventClickNew} selectInfo={selectInfo} />
      );
    case "viewAppo":
      return <ViewEvent eventClickNew={eventClickNew} />;
    default:
      return null;
  }
}

export default UserModals;
