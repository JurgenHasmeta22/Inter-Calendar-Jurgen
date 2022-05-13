// #region "Importing stuff"
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./DeleteEvent.css";
import { toast } from "react-toastify";
import { setUser } from "../../../../main/store/stores/user/user.store";
import {RootState} from "../../../store/redux/rootState"

import {
    setSelectedDoctor,
    setModal
} from "../../../store/stores/dashboard/dashboard.store"

import userEvent from "@testing-library/user-event";
import useGetUser from "../../../hooks/useGetUser";

// #endregion


function DeleteModal() {

  const user = useGetUser()

    // #region "Redux and other stats, also hooks"
    const dispatch = useDispatch();
    const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
    const eventClick = useSelector((state: RootState) => state.dashboard.eventClick);
    // #endregion


    // #region "Helpers functions and event listeners"
    const handleDeleteEvent = async () => {

        const appointementId = Number(eventClick.event._def.publicId);
        console.log(appointementId)
        
        // const dataToSend: any = {
        //   doctor_id: selectedDoctor?.id,
        //   user_id: user.id
        // }

        const dataFromServer = await (await axios.delete(`appointements/${appointementId}`)).data;

        if (!dataFromServer.error) {

            dispatch(setSelectedDoctor(dataFromServer.doctorServer));
            dispatch(setUser(dataFromServer.patientServer));

            toast.success(dataFromServer.msg);
            dispatch(setModal(""));

        } 
        
        else {
            toast.error(dataFromServer.error);
        }

    };
    // #endregion


  return (

    <div

      onClick={() => {
        setModal("");
      }}

      className="modal-wrapper"
    >

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}

        className="modal-container delete-modal-container"
      >

        <header className="modal-header">

          <CloseIcon
            fontSize="large"
            className="close-icon"
            sx={{ color: "#50a2fd" }}

            onClick={() => {
              dispatch(setModal(""));
            }}
          />

          <h2>Do u want to delete this Event ?</h2>

        </header>

        <main className="modal-body delete-modal-body">

          <button
            onClick={() => {
              dispatch(setModal(""));
            }}

            className="general-button cancel-btn"
          >

            Cancel

          </button>

          <button
            onClick={handleDeleteEvent}
            className="general-button delete-btn"
          >

            Delete

          </button>

        </main>

      </div>

    </div>

  );

}

export default DeleteModal;