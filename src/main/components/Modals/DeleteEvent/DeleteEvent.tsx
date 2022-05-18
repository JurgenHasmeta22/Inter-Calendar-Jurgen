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


function DeleteModal({eventClickNew}: any) {

  const user = useGetUser()

    // #region "Redux and other stats, also hooks"
    const dispatch = useDispatch();
    const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
    // #endregion


    // #region "Helpers functions and event listeners"
    const handleDeleteEvent = async () => {

        const appointementId = Number(eventClickNew.event._def.publicId);

        console.log(appointementId)

        const dataFromServer = await (await axios.delete(`appointements/${appointementId}`)).data;

        if (!dataFromServer.error) {

            dispatch(setSelectedDoctor(dataFromServer.updatedDoctor));
            dispatch(setUser(dataFromServer.updatedUser));
            dispatch(setModal(""));

            toast.success(dataFromServer.msg);

        } 
        
        else {
          toast.error(dataFromServer.error);
        }

    };

    const handleChangeEvent = async () => {
      dispatch(setModal("edit"))
    }

    const handleViewEvent = async () => {
      dispatch(setModal("viewAppo"))
    }
    // #endregion


  return (

    <div

      onClick={() => {
        dispatch(setModal(""))
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

          <button
            onClick={handleChangeEvent}
            className="general-button change-btn"
          >

            Change Status

          </button>

          <button
            onClick={handleViewEvent}
            className="general-button change-btn"
          >

            View Appointement Details

          </button>

        </main>

      </div>

    </div>

  );

}

export default DeleteModal;

//idea how to change status better, first we get the appointementId from the eventClickNew state, then use it to fetch that specific appointement and store it in state, then use that to find the status
// and to change it after with put etc