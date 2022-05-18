
import { useDispatch, useSelector } from "react-redux"
import "../ViewEvent/ViewEvent.css"
import CloseIcon from "@mui/icons-material/Close";

import useGetUser from "../../../hooks/useGetUser"
import { setAppointements, setModal } from "../../../store/stores/dashboard/dashboard.store"
import axios from "axios";
import { useState, useEffect } from "react";
import IAppointement from "../../../interfaces/IAppointement";
import { RootState } from "../../../store/redux/rootState";


export default function EditEvent({eventClickNew}: any) {

    const dispatch = useDispatch()
    const user = useGetUser()

    const [appointementSpecific, setAppointementSpecific] = useState<IAppointement | null>(null)
    const [patientUserName, setPatientUserName] = useState<string>(null)
    
    const selectedDoctor = useSelector((state: RootState) => state.dashboard.selectedDoctor);
    const patients = useSelector((state: RootState) => state.dashboard.patients);

    async function getAppointementFromServer() {

        const id = Number(eventClickNew.event._def.publicId)

        let result = await (await axios.get(`/appointements/${id}`));
        setAppointementSpecific(result.data)

    }

    useEffect(()=> {
        getAppointementFromServer()
    }, [])

    function getPatientUserName() {
        
        let patientUserName

        for (const patient of patients) {

            if (appointementSpecific?.user_id === null) {
                patientUserName = "null"
            }

            else if(patient.id === appointementSpecific?.user_id) {
                patientUserName = patient.userName
            }

        }

        // setPatientUserName(patientUserName) dont do it with state updating etc beacause its easier this way

        console.log(patientUserName)
        
        return patientUserName

    }

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

                        <h2>View detailed info of Event</h2>

                        <div className="appointement-info">

                            <span><strong>Id: </strong> {appointementSpecific?.id} </span>
                            <span><strong>Price: </strong> {appointementSpecific?.price} </span>
                            <span><strong>Start Date: </strong> {appointementSpecific?.startDate} </span>
                            <span><strong>End Date: </strong> {appointementSpecific?.endDate} </span>
                            <span><strong>Title: </strong> {appointementSpecific?.title} </span>
                            <span><strong>Status: </strong> {appointementSpecific?.status} </span>
                            <span><strong>Doctor Id: </strong>{ appointementSpecific?.doctor_id !== null ? appointementSpecific?.doctor_id: "null"}</span>
                            <span><strong>Doctor userName: </strong> {user?.isDoctor ? user?.userName: selectedDoctor?.userName } </span>
                            <span><strong>Patient Id: </strong>{ appointementSpecific?.user_id !== null ? appointementSpecific?.user_id: "null"}</span>
                            <span><strong>Patient userName: </strong> {getPatientUserName()} </span>
                            <span><strong>Appointement Desc: </strong> {appointementSpecific?.description} </span>

                        </div>

                    </header>

                </div>

            </div>
        
        </>

    )

}