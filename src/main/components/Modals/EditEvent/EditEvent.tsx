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
        
        console.log(e.target.value)
        
        const hour = e.target.value
        const numberHour = Number(hour.substring(0,2))

        console.log(hour, numberHour)

        if(numberHour >= 16 || numberHour <= 8) {
            toast.error("Cant enter more than allowed time please choose between 08-16 hours")
        }

        else {

            const startDateInitial = startDateEdit.substring(0, 11)
            const finalDateToSend = `${startDateInitial}${hour}:00`
            
            setEndDateEdit(finalDateToSend)

        }

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

        try {

            let result = await axios.patch(`appointements/${appointementSpecific?.id}`, dataToSend);

            if (result === undefined) {
                toast.error("Attempt not successfully below are some reasons, \n 1) You entered incorrect data. \n 2) You tried to have same time booking. \n 3) You tried to book twice in the same day");
                dispatch(setModal(""))
            }

            else if (!result?.data?.error) {

                dispatch(setSelectedDoctor(result.data.doctorServer))
                dispatch(setUser(result.data.patientServer));
                dispatch(setDoctors(result.data.doctorsServer))

                dispatch(setModal(""))
                toast.success("Succesfully Updated Event");

            }

        }

        catch(error) {
            toast.error(error)
        }

        // #region "Trying alternative ways"

        // let result = await (await axios.patch(`appointements/${appointementSpecific?.id}`, dataToSend)).data;

        // if (result?.error) {
        //     toast.error(result?.error);
        //     // alert(result?.data?.error)
        //     // toast.error("Attempt not successfully, either you entered incorrect data or you tried to have same time booking or tried to book twice in the same day ");
        //     dispatch(setModal(""))
        // }

        // else {

        //     dispatch(setSelectedDoctor(result.data.doctorServer))
        //     dispatch(setUser(result.data.patientServer));
        //     dispatch(setDoctors(result.data.doctorsServer))

        //     dispatch(setModal(""))
        //     toast.success("Succesfully Updated Event");

        // }

        // #endregion

    }

    function handleSetStartDateEdit(start: string) {

        const finalStart = Number(start.substring(11, 13))

        console.log(finalStart)

        if(finalStart >= 16 || finalStart <= 8) {
            toast.error("Cant enter more than allowed time please choose between 08-16 hours")
        }

        else {
            setStartDateEdit(start)
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
                                    value={startDateEdit}
                                    min= "2022-05-20T08:00"
                                    max="2023-06-01T16:00"   
                                    onChange={(e: any) => {
                                        // setStartDateEdit(e.target.value)
                                        handleSetStartDateEdit(e.target.value)
                                    }}                           
                                />

                            </label>

                            <label>

                                End date:
                                
                                <input
                                    type="time"
                                    name="endDateEdit"
                                    className="endDateEdit"
                                    // value={endDateEdit.substring(0,3)}
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