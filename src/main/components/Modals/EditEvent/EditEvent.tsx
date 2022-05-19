// #region "Importing stuff"
import { useDispatch } from "react-redux"
import "../EditEvent/EditEvent.css"
import CloseIcon from "@mui/icons-material/Close";

import useGetUser from "../../../hooks/useGetUser"
import { setDoctors, setModal, setSelectedDoctor } from "../../../store/stores/dashboard/dashboard.store"
import IAppointement from "../../../interfaces/IAppointement";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { setUser } from "../../../store/stores/user/user.store";
import { setTitle } from "../../../store/stores/modals/modals.store";
// #endregion


export default function EditEvent({eventClickNew, selectInfo}: any) {


    // #region "React state, and hooks"
    const dispatch = useDispatch()
    const user = useGetUser()

    const [appointementSpecific, setAppointementSpecific] = useState<IAppointement | null>(null)

    const [titleEdit, setTitleEdit] = useState<string>(null)
    const [descEdit, setDescEdit] = useState<string>(null)
    const [startDateEdit, setStartDateEdit] = useState<string>(null)
    const [endDateEdit, setEndDateEdit] = useState<string>(null)
    const [statusEdit, setStatusEdit] = useState<boolean>(null)
    // #endregion


    // #region "Helpers functions and fetching stuff from server"
    async function getAppointementFromServer() {

        const id = Number(eventClickNew.event._def.publicId)

        let result = await (await axios.get(`/appointements/${id}`));

        setAppointementSpecific(result.data)
        setStartDateEdit(result.data.startDate)
        setStatusEdit(result.data.status)
        setDescEdit(result.data.description)
        setTitleEdit(result.data.title)

    }

    useEffect(()=> {
        getAppointementFromServer()
    }, [])
    
    const changeDateFormat = (date: string) => {
        return date.substring(0, date.length - 6);
    };

    function handleStatusEditChange(e: any) {

        const status = e.target.value

        if (status === "approved") {
            setStatusEdit(status)
        }

        else if (status === "pending") {
            setStatusEdit(status)
        }

        else if (status === "cancelled") {
            setStatusEdit(status)
        }

    }

    let today = Date()

    function handleEndDateChange(e: any) {
        
        // console.log(e.target.value)
        
        const hour = e.target.value

        const startDateInitial = startDateEdit.substring(0, 11)
        const finalDateToSend = `${startDateInitial}${hour}:00`
        
        setEndDateEdit(finalDateToSend)

    }

    async function handleSaveChanges() {

        const dataToSend = {
            price: 350,
            startDate: startDateEdit,
            endDate: endDateEdit,
            title: titleEdit,
            description: descEdit,
            status: statusEdit,
            user_id: appointementSpecific?.user_id,
            doctor_id: appointementSpecific?.doctor_id,
            //@ts-ignore
            doctor_post_id: null,
            category_id: 1
        }

        let result = await (await axios.patch(`appointements/${appointementSpecific?.id}`, dataToSend)).data;

        if (result === undefined || result === null) {
            toast.warn("Error");
        }

        if (!result?.error) {

            dispatch(setSelectedDoctor(result.doctorServer))
            dispatch(setUser(result.patientServer));
            dispatch(setDoctors(result.doctorsServer))

            dispatch(setModal(""))
            toast.success("Succesfully Updated Event");

        }

        else {
            toast.warn("Error");
        }

    }
    // #endregion

    
    return ( 

        <>
        
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

                        <h2 className="editing-status">Editing status of event</h2>

                        <span className="status-span-edit">Current Status is: <strong>{appointementSpecific?.status}</strong> </span>

                        <form className="form-edit-event" onSubmit={function (e) {
                            e.preventDefault()
                            handleSaveChanges()
                        }}>

                            <label>

                                Title: 

                                <input
                                    type="text"
                                    name="title"
                                    className="title"
                                    required
                                    onChange={(e: any) => {
                                        setTitleEdit(e.target.value)
                                    }}
                                />

                            </label>

                            <label>

                                Description: 

                                <input
                                    type="text"
                                    name="title"
                                    className="title"
                                    required
                                    onChange={(e: any) => {
                                        setDescEdit(e.target.value)
                                    }}
                                />

                            </label>

                            <label>

                                Start date: 

                                <input
                                    type="datetime-local"
                                    name="startDateEdit"
                                    className="startDateEdit"
                                    defaultValue={appointementSpecific?.startDate} 
                                    min= "2022-05-18T12:00"
                                    max="2023-06-01T00:00"   
                                    onChange={(e: any) => {
                                        setStartDateEdit(e.target.value)
                                    }}                           
                                />

                            </label>

                            <label>

                                End date:
                                
                                <input
                                    type="time"
                                    name="endDateEdit"
                                    className="endDateEdit"
                                    onChange={(e: any) => {
                                        handleEndDateChange(e)
                                    }} 
                                />
                                
                            </label>

                            {

                                user?.isDoctor ? (
                                    
                                    <label>

                                        Status:

                                        <select name="filter-by-sort" id="filter-by-sort" defaultValue={'false'}
                                        onChange={function (e: any) {
                                            handleStatusEditChange(e)
                                        }}>
                                            

                                            { appointementSpecific?.status !== "approved" ? <option value="approved">Approved</option> : null }
                                            { appointementSpecific?.status !== "pending" ? <option value="pending">Pending</option> : null }
                                            { appointementSpecific?.status !== "cancelled" ? <option value="cancelled">Cancelled</option> : null }

                                        </select>
                                
                                    </label>

                                ): null

                            }

                            <button type="submit">Save Changes</button>

                        </form>

                    </header>

                </div>

            </div>
        
        </>

    )

}