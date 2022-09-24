import { useDispatch, useSelector } from "react-redux";
import "../NotificationEvent/NotificationEvent.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  invalidateModal,
  setDoctors,
  setModal,
  setSelectedDoctor,
} from "../.././../store/stores/dashboard/dashboard.store";
import { RootState } from "../../../store/redux/rootState";
import useGetUser from "../../../hooks/useGetUser";
import { toast } from "react-toastify";
import { setUser } from "../../../store/stores/user/user.store";
import axios from "axios";
import { motion } from "framer-motion";

export default function NotificationEvent() {
  const dispatch = useDispatch();
  const user = useGetUser();

  const selectedDoctor = useSelector(
    (state: RootState) => state.dashboard.selectedDoctor
  );

  let rowsOld: any = [];
  //@ts-ignore
  if (user?.isDoctor === false) {
    rowsOld = [];
  } else {
    rowsOld = [...selectedDoctor?.acceptedAppointemets];
  }
  let newArray = [];
  for (const element of rowsOld) {
    const newObject = {
      ...element,
      doctorUserName: selectedDoctor?.userName,
    };
    if (element.status === "pending") {
      newArray.push(newObject);
    }
  }
  const rows = [...newArray];

  async function handleButtonApprove(doctorId: any, appointementId: any) {
    const dataToSend = {
      status: "approved",
      doctor_id: doctorId,
    };
    let result = await (
      await axios.put(`appointements/${appointementId}`, dataToSend)
    ).data;
    if (!result.error) {
      dispatch(setSelectedDoctor(result.doctorServer));
      dispatch(setUser(result.patientServer));
      dispatch(setDoctors(result.doctorsServer));
      dispatch(setModal(""));
      toast.success("Succesfully Updated Event");
    } else if (result === undefined) {
      toast.error("Error fetching the selected appointement from the server");
      dispatch(setModal(""));
    }
  }

  async function handleButtonCancel(doctorId: any, appointementId: any) {
    const dataToSend = {
      status: "cancelled",
      doctor_id: doctorId,
    };
    let result = await (
      await axios.put(`appointements/${appointementId}`, dataToSend)
    ).data;
    if (!result.error) {
      dispatch(setSelectedDoctor(result.doctorServer));
      dispatch(setUser(result.patientServer));
      dispatch(setDoctors(result.doctorsServer));
      dispatch(setModal(""));
      toast.success("Succesfully Updated Event");
    }
  }

  return (
    <div
      onClick={() => {
        dispatch(invalidateModal());
      }}
      className="modal-wrapper"
    >
      <motion.section
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-container"
        >
          <header className="modal-header">
            <CloseIcon
              fontSize="large"
              sx={{ color: "#50a2fd" }}
              className="close-icon"
              onClick={() => {
                dispatch(invalidateModal());
              }}
            />
            <h2>Pending Appointements</h2>
          </header>
          {rows.length !== 0 ? (
            <table className="table-data">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Price</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>User id</th>
                  <th>Doctor id</th>
                  <th>Category id</th>
                  <th>Doctor userName</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((post) => (
                  <tr className="post-item" onClick={() => {}}>
                    <td>{post.id}</td>
                    <td>{post.price}</td>
                    <td>{post.startDate}</td>
                    <td>{post.endDate}</td>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                    <td>{post.status}</td>
                    <td>{post.user_id}</td>
                    <td>{post.doctor_id}</td>
                    <td>{post.category_id}</td>
                    <td>{selectedDoctor?.userName}</td>
                    <td className="special-td">
                      <button
                        onClick={function (e: any) {
                          handleButtonApprove(post.doctor_id, post.id);
                        }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={function (e: any) {
                          handleButtonCancel(post.doctor_id, post.id);
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </motion.section>
    </div>
  );
}
