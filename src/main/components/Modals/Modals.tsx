import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./Modals.css";
import AppointementModal from "../Modals/AddEvent/AppointementModal"
import DeleteEvent from "../Modals/DeleteEvent/DeleteEvent"
import NotificationEvent from "./NotificationEvent/NotificationEvent";

function Modals() {

  const modal = useSelector((state: RootState) => state.dashboard.modal);

  switch (modal) {

    case "appoinment":
      return <AppointementModal />

    case "deleteEvent":
      return <DeleteEvent />

    case "notification":
      return <NotificationEvent />
    
    default:
      return null;

  }

}

export default Modals;