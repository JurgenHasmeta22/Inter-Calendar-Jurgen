import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./Modals.css";
import AppointementModal from "../Modals/AddEvent/AppointementModal"

function Modals() {

  const modal = useSelector((state: RootState) => state.dashboard.modal);

  switch (modal) {

    case "appoinment":
      return <AppointementModal />;
    
    default:
      return null;

  }

}

export default Modals;