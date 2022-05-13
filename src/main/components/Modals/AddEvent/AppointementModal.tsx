// #region "Importing stuff"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../../../store/stores/dashboard/dashboard.store";
import IEvent from "../../../interfaces/IEvent";
import { invalidateModal, setDoctors, setModal, setSelectedDoctor } from "../../../store/stores/dashboard/dashboard.store";
import { RootState } from "../../../store/redux/rootState";
import useGetUser from "../../../hooks/useGetUser";

import {
setCategoryId,
setDescription,
setDoctorId,
setStartDate,
setTitle,
setEndDate,
setUserId
} from "../../../store/stores/modals/modals.store"

import {
setUser
} from "../../../store/stores/user/user.store"

import axios from "axios";
import { toast } from "react-toastify";
// #endregion

function AppointementModal() {

    // #region "State and hooks"
    const [error, setError] = useState("");
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const user = useGetUser()

    const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
    const doctors = useSelector((state: RootState) => state.dashboard.doctors);

    // const price = useSelector((state: RootState) => state.modals.price);
    const startDate = useSelector((state: RootState) => state.modals.startDate);
    const endDate = useSelector((state: RootState) => state.modals.endDate);
    const title = useSelector((state: RootState) => state.modals.title);
    const description = useSelector((state: RootState) => state.modals.description);
    // #endregion

    function handleOnChangeDoctor(e: any) {

        const newDoctors = [...doctors]
        const doctorFinal = newDoctors.find(doctor => doctor.firstName + " " + doctor.lastName === e.target.value )

        dispatch(setSelectedDoctor(doctorFinal))
        // handleOnChangeSelect(e)

    }

    async function postAppointement(e: any) {

        const dataToSend = {
            price: 350,
            startDate: startDate,
            endDate: endDate,
            // startDate: ${selectInfo.startStr}T${e.target.startTime.value}:00,
            // endDate: ${selectInfo.startStr}T${e.target.endTime.value}:00,
            title: title,
            description: description,
            status: 1,
            user_id: user?.id,
            doctor_id: selectedDoctor?.id,
            category_id: 1
        }

        let result = await (await axios.post(`appointements`, dataToSend)).data;

        if (!result.error) {

            dispatch(setSelectedDoctor(result.doctorServer))
            dispatch(setUser(result.patientServer));

            dispatch(setModal(""))
            toast.success("Succesfully Created Event");

        }


    }

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
                        onSubmit={(e: any) => {
                            e.preventDefault()
                            postAppointement(e)
                        }}
                    >

                        <label>

                            Description: 

                            <input
                                type="text"
                                className="description"
                                name="description"
                                required
                                onChange={(e: any) => {
                                    dispatch(setDescription(e.target.value))
                                }}
                            />

                        </label>

                        <label>

                            Title: 

                            <input
                                type="text"
                                name="title"
                                className="title"
                                required
                                onChange={(e: any) => {
                                    dispatch(setTitle(e.target.value))
                                }}
                            />

                        </label>

                        <label>

                            Doctor choosen: 

                            <input
                                type="text"
                                name="doctor"
                                className="doctor"
                                readOnly
                                value={selectedDoctor?.firstName + " " + selectedDoctor?.lastName}
                                // onLoad={(e: any) => {
                                //     dispatch(setDoctorId(selectedDoctor?.id))
                                // }}
                            />

                        </label>

                        <label>

                            Patient: 

                            <input
                                type="text"
                                name="patient"
                                className="patient"
                                readOnly
                                value={user?.firstName + " " + user?.lastName}
                                // onLoad={(e: any) => {
                                //     dispatch(setUserId(user?.id))
                                // }}
                            />

                        </label>

                        <label>

                            Category Id of visit: 

                            <input
                                type="text"
                                name="category"
                                className="category"
                                readOnly
                                value = {"1"}
                                // onLoad={(e: any) => {
                                //     dispatch(setCategoryId(e.target.value))
                                // }}
                            />

                        </label>

                        <label>

                            Start date: 

                            <input
                                type="datetime-local"
                                name="startDate"
                                className="startDate"
                                required
                                onChange={(e: any) => {
                                    dispatch(setStartDate(e.target.value))
                                }}
                            />

                        </label>

                        <label>

                            End date:

                            <input
                                type="datetime-local"
                                name="endDate"
                                className="endDate"
                                required
                                onChange={(e: any) => {
                                    dispatch(setEndDate(e.target.value))
                                }}
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