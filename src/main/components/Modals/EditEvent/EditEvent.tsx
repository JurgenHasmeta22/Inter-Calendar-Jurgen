
import { useDispatch } from "react-redux"
import "../EditEvent/EditEvent.css"
import CloseIcon from "@mui/icons-material/Close";

import useGetUser from "../../../hooks/useGetUser"
import { setModal } from "../../../store/stores/dashboard/dashboard.store"
import IAppointement from "../../../interfaces/IAppointement";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";


export default function EditEvent({eventClickNew, selectInfo}: any) {

    const dispatch = useDispatch()
    const user = useGetUser()

    const [appointementSpecific, setAppointementSpecific] = useState<IAppointement | null>(null)
    const [titleEdit, setTitleEdit] = useState<string>(null)
    const [startDateEdit, setStartDateEdit] = useState<string>(null)
    const [endDateEdit, setEndDateEdit] = useState<string>(null)
    const [statusEdit, setStatusEdit] = useState<boolean>(null)

    async function getAppointementFromServer() {

        const id = Number(eventClickNew.event._def.publicId)

        let result = await (await axios.get(`/appointements/${id}`));
        setAppointementSpecific(result.data)

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

    // console.log(today.toLocaleUpperCase())

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

                                Start date: 

                                <input
                                    type="datetime-local"
                                    name="startDateEdit"
                                    className="startDateEdit"
                                    defaultValue={appointementSpecific?.startDate} 
                                    // min= {today.toLocaleString()} 
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
                                    type="datetime-local"
                                    name="endDateEdit"
                                    className="endDateEdit"
                                    // disabled
                                    defaultValue={startDateEdit}
                                    min= "2022-05-18T12:00"
                                    max="2022-05-018T16:00"
                                    onChange={(e: any) => {
                                        setEndDateEdit(e.target.value)
                                    }} 
                                />
                                
                            </label>

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

                        </form>

                    </header>

                </div>

            </div>
        
        </>

    )

}