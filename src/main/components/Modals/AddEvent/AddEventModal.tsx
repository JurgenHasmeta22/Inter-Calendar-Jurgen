import "./AddEventModal.css"

import {
    setOpen
} from "../../../store/stores/dashboard/dashboard.store"

import { useDispatch } from "react-redux"

export default function AddEventModal() {

    const dispatch = useDispatch()

    return (

        <>

            <form className="form-add-event-modal" onSubmit={function (e: any) {
                e.preventDefault()
            }}>

                <label id="price" htmlFor="">

                    <input type="text" placeholder="Enter your Price:" required onChange={function (e) {
                        // handleUserNameRegister(e)
                    }}/>

                </label>

                <label id="price" htmlFor="">

                    <input type="text" placeholder="Enter your Description:" required onChange={function (e) {
                        // handleUserNameRegister(e)
                    }}/>

                </label>

                <button onClick={function () {
                    dispatch(setOpen(false))
                }}>X</button>

            </form>

        </>

    )

}