import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../InputElement/InputElement.css"
import {RootState} from "../../../store/redux/rootState"

import {
    setTitle,
    setDescription,
    setCategoryId,
    setStartDate,
    setPrice,
    setUserId,
    setDoctorId,
    setEndDate
} from "../../../store/stores/modals/modals.store"

export default function InputElement({
    type, 
    name, 
    className, 
}: any) {

    const [inputType] = useState(type);
    const [inputName] = useState(name);
    const [inputClassName] = useState(className);

    const dispatch = useDispatch()

    const modal = useSelector((state: RootState) => state.dashboard.modal);

    function handleChangeAppointementModal(e: any) {

        if (modal === "appoinment" && inputName === "description") {
            dispatch(setDescription(e.target.value))
        }

        else if (modal === "appoinment" && inputName === "title") {
            dispatch(setTitle(e.target.value))
        }

    }

    return (

        <>

            <input
                type = {inputType}
                name = {inputName}
                className = {inputClassName}
                required
                onChange={function (e: any) {
                    handleChangeAppointementModal(e)
                }}
            />
        
        </>

    )
    
}