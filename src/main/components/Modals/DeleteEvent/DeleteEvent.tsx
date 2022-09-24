import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./DeleteEvent.css";
import { toast } from "react-toastify";
import { setUser } from "../../../../main/store/stores/user/user.store";
import {
  setSelectedDoctor,
  setModal,
  setDoctors,
} from "../../../store/stores/dashboard/dashboard.store";
import { motion } from "framer-motion";

function DeleteModal({ eventClickNew }: any) {
  const dispatch = useDispatch();

  const handleChangeEvent = async () => {
    dispatch(setModal("edit"));
  };
  const handleViewEvent = async () => {
    dispatch(setModal("viewAppo"));
  };

  const handleDeleteEvent = async () => {
    const appointementId = Number(eventClickNew.event._def.publicId);
    const dataFromServer = await (
      await axios.delete(`appointements/${appointementId}`)
    ).data;
    if (!dataFromServer.error) {
      dispatch(setSelectedDoctor(dataFromServer.updatedDoctor));
      dispatch(setUser(dataFromServer.updatedUser));
      dispatch(setDoctors(dataFromServer.updatedDoctors));
      dispatch(setModal(""));
      toast.success(dataFromServer.msg);
    } else if (dataFromServer === undefined) {
      toast.error(
        "There is an error in the response from the server reasons as below can be, \n 1)You tried to send incorrent data \n 2)You tried to delete something wich doesnt exist or forced to delete something not yours"
      );
      dispatch(setModal(""));
    }
  };

  return (
    <div
      onClick={() => {
        dispatch(setModal(""));
      }}
      className="modal-wrapper"
    >
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
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
              onClick={handleViewEvent}
              className="general-button change-btn"
            >
              View Appointement Details
            </button>
            <button
              onClick={handleChangeEvent}
              className="general-button change-btn"
            >
              Change Status
            </button>
          </main>
        </div>
      </motion.div>
    </div>
  );
}

export default DeleteModal;
