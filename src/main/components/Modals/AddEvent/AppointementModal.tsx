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
import React from "react";
import { DateSelectArg } from "@fullcalendar/react";
// #endregion


function AppointementModal({selectInfo}: any) {


    // #region "State and hooks"
    const [error, setError] = useState("");
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const user = useGetUser()

    const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
    const selectedPatient = useSelector((state: RootState) => state.dashboard.selectedPatient);

    const selectedFreeTime = useSelector((state: RootState) => state.dashboard.selectedFreeTime);

    // const selectInfo = useSelector((state: RootState) => state.dashboard.selectInfo);

    const doctors = useSelector((state: RootState) => state.dashboard.doctors);

    // const price = useSelector((state: RootState) => state.modals.price);
    const startDate = useSelector((state: RootState) => state.modals.startDate);
    const endDate = useSelector((state: RootState) => state.modals.endDate);
    const title = useSelector((state: RootState) => state.modals.title);
    const description = useSelector((state: RootState) => state.modals.description);

    

    let calendarRef = React.createRef();
    // #endregion

    
    // #region "Helpers functions and event listeners"
    function handleOnChangeDoctor(e: any) {

        const newDoctors = [...doctors]
        const doctorFinal = newDoctors.find(doctor => doctor.firstName + " " + doctor.lastName === e.target.value )

        dispatch(setSelectedDoctor(doctorFinal))

    }

    async function postAppointement(e: any) {

        let dataToSend

        if (selectedFreeTime === false) {

            dataToSend = {
                price: 350,
                startDate: changeDateFormat(selectInfo.startStr),
                endDate: changeDateFormat(selectInfo.endStr),
                title: title,
                description: description,
                status: user?.isDoctor ? "approved": "pending",
                user_id: selectedPatient?.id,
                doctor_id: selectedDoctor?.id,
                category_id: 1,
                doctor_post_id: null
            }

        }

        else if(selectedFreeTime === true &&  user.isDoctor) {

            dataToSend = {
                price: 350,
                startDate: changeDateFormat(selectInfo.startStr),
                endDate: changeDateFormat(selectInfo.endStr),
                title: title,
                description: description,
                status: user?.isDoctor ? "approved": "pending",
                user_id: null,
                doctor_id: null,
                category_id: 1,
                doctor_post_id: selectedDoctor?.id
            }

        }

        let result = await (await axios.post(`appointements`, dataToSend)).data;

        if (!result.error) {

            dispatch(setSelectedDoctor(result.doctorServer))
            dispatch(setUser(result.patientServer));
            dispatch(setDoctors(result.doctorsServer))

            dispatch(setModal(""))
            toast.success("Succesfully Created Event");

        }

    }

    const changeDateFormat = (date: string) => {
        return date.substring(0, date.length - 6);
    };
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
                            />

                        </label>

                        <label>

                            Patient: 

                            <input
                                type="text"
                                name="patient"
                                className="patient"
                                readOnly
                                value={selectedPatient ? selectedPatient?.firstName + " " + selectedPatient?.lastName : "Free"}
                            />

                        </label>

                        <label>

                            Start date: 

                            <input
                                type="datetime-local"
                                name="startDate"
                                className="startDate"
                                disabled
                                defaultValue={changeDateFormat(selectInfo.startStr)}
                            />

                        </label>

                        <label>

                            End date:

                            <input
                                type="datetime-local"
                                name="endDate"
                                className="endDate"
                                disabled
                                defaultValue={changeDateFormat(selectInfo.endStr)}
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