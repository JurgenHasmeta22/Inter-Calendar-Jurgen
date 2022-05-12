import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import {  } from "../../../store/stores/dashboard/dashboard.store";
import IEvent from "../../../interfaces/IEvent";
import { invalidateModal } from "../../../store/stores/dashboard/dashboard.store";

function AppointementModal() {

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

                            description

                            <input
                                type="text"
                                className="description"
                                name="description"
                                required
                            />

                        </label>

                        <label>

                            title:

                            <input
                                type="text"
                                name="title"
                                className="title"
                                required
                            />

                        </label>

                        <label>

                            start Date:

                            <input
                                type="datetime-local"
                                name="startDate"
                                className="startDate"
                                required
                            />

                        </label>

                        <label>

                            end Date:

                            <input
                                type="datetime-local"
                                name="endDate"
                                className="endDate"
                                required
                            />
                            
                        </label>

                        {error !== "" ? <span className="email-error">{error}</span> : null}

                        <button type="submit">book</button>

                    </form>

                </main>

            </div>

        </div>

    );

}

export default AppointementModal