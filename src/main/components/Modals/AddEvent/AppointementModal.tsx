// #region "Importing stuff"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../../../store/stores/dashboard/dashboard.store";
import IEvent from "../../../interfaces/IEvent";
import { invalidateModal } from "../../../store/stores/dashboard/dashboard.store";
import { RootState } from "../../../store/redux/rootState";
import useGetUser from "../../../hooks/useGetUser";
// #endregion

function AppointementModal() {

    // #region "State and hooks"
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useGetUser()

    const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
    // #endregion

    return (

        <div
            onClick={() => {
                dispatch(invalidateModal());
            }}

            className="modal-wrapper"
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

                    <h2>Book Now</h2>

                </header>

                <main className="modal-body">

                    <form
                    // onSubmit={handleSubmit}
                    >

                        <label>

                            Description: 

                            <input
                                type="text"
                                className="description"
                                name="description"
                                required
                            />

                        </label>

                        <label>

                            Title: 

                            <input
                                type="text"
                                name="title"
                                className="title"
                                required
                            />

                        </label>

                        <label>

                            Doctor choosen: 

                            <input
                                type="text"
                                name="doctor"
                                className="doctor"
                                disabled
                                value={selectedDoctor?.firstName + " " + selectedDoctor?.lastName}
                            />

                        </label>

                        <label>

                            Patient: 

                            <input
                                type="text"
                                name="patient"
                                className="patient"
                                disabled
                                value={user?.firstName + " " + user?.lastName}
                            />

                        </label>

                        <label>

                            Category Id of visit: 

                            <input
                                type="text"
                                name="category"
                                className="category"
                                disabled
                                value={"1"}
                            />

                        </label>

                        <label>

                            Start date: 

                            <input
                                type="datetime-local"
                                name="startDate"
                                className="startDate"
                                required
                            />

                        </label>

                        <label>

                            End date:

                            <input
                                type="datetime-local"
                                name="endDate"
                                className="endDate"
                                required
                            />
                            
                        </label>

                        {error !== "" ? <span className="email-error">{error}</span> : null}

                        <button type="submit">Book an appointement</button>

                    </form>

                </main>

            </div>

        </div>

    );

}

export default AppointementModal