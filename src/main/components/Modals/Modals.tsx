import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./Modals.css";
import AppointementModal from "../Modals/AddEvent/AppointementModal"
import DeleteEvent from "../Modals/DeleteEvent/DeleteEvent"

function Modals() {

  const modal = useSelector((state: RootState) => state.dashboard.modal);

  switch (modal) {

    case "appoinment":
      return <AppointementModal />;

    case "deleteEvent":
      return <DeleteEvent />
    
    default:
      return null;

  }

}

export default Modals;