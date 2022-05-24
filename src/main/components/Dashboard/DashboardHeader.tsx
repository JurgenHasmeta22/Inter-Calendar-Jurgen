import useGetUser from "../../hooks/useGetUser"
import { motion } from "framer-motion";

export default function DashboardHeader() {

    const user = useGetUser()
    
    return (

        <>

            <div className="header-container">

                {

                    //@ts-ignore
                    user?.isDoctor === false ? (
                        <h3 className="dashboard-title">User Dashboard</h3>
                    ): (
                        <h3 className="dashboard-title">Doctor Dashboard</h3>
                    )

                }

            </div>

        </>

    )

}