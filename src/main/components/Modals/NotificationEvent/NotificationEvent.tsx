import { useDispatch } from "react-redux";

import {
    invalidateModal,
    setModal
} from "../.././../store/stores/dashboard/dashboard.store"

export default function NotificationEvent() {

    const dispatch = useDispatch()

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

                

            </div>

        </div>

    );

}