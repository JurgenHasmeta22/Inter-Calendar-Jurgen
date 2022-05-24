// #region "Importing stuff"
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useGetUser from "../../hooks/useGetUser"
import { RootState } from "../../store/redux/rootState";
// #endregion

export default function DashboardSelect({
    handleOnChangeDoctor,
    handleOnChangePatient,
    handleOnChangeFreeAppointement
}: any) {

    // #region "React hooks and redux state"
    const user = useGetUser()

    const doctors = useSelector((state: RootState) => state.dashboard.doctors);
    const patients = useSelector((state: RootState) => state.dashboard.patients);
    // #endregion
    
    return (

        <>
        
            {
                
                !user?.isDoctor ? (

                    // #region "User Select"
                    <motion.div
                        initial={{ opacity: 0, y: 850 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
                        className="select-doctor-wrapper"
                    >

                        <div className="select-doctor-wrapper">
                
                            <span>Choose a doctor from our clicic for an appointement: </span>
                    
                            <select name="filter-by-sort" id="filter-by-sort" defaultValue={'DEFAULT'}
                                onChange={function (e: any) {
                                    handleOnChangeDoctor(e)
                            }}>
                                
                                <option value="DEFAULT" disabled> Select Doctor</option>
                    
                                {
                                
                                    doctors?.length === 0 ? (
                                        <option value="Default">No Doctor to choose</option>
                                    ): (
                                        
                                        //@ts-ignore
                                        doctors?.map(doctor =>  
                                            <option key={doctor.id} value = {doctor.firstName + " " + doctor.lastName}> {doctor.firstName + " " + doctor.lastName} </option>
                                        )
                    
                                    )
                    
                                }
                    
                            </select>
                
                        </div>

                    </motion.div>
                    // #endregion

                ): (

                    // #region "Doctor Select"
                    <motion.div
                        initial={{ opacity: 0, y: 850 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
                        className="select-doctor-wrapper"
                    >

                        <div className="select-doctor-wrapper">
                
                            <span>Choose a patient from our clicic for an appointement: </span>
                
                            <select name="filter-by-sort" id="filter-by-sort" defaultValue={'DEFAULT'}
                                onChange={function (e: any) {
                                    handleOnChangePatient(e)
                            }}>
                                
                                <option value="DEFAULT"> Select Patient</option>
                    
                                {
                                
                                    doctors?.length === 0 ? (
                                        <option value="Default">No Patient to choose</option>
                                    ): (
                                        
                                        //@ts-ignore
                                        patients?.map(patient =>  
                                            <option key={patient.id} value = {patient.firstName + " " + patient.lastName}> {patient.firstName + " " + patient.lastName} </option>
                                        )
                    
                                    )
                    
                                }
                    
                            </select>

                            <span>Appointement Free: </span>
                
                            <select name="filter-by-sort" id="filter-by-sort" defaultValue={'false'}
                                onChange={function (e: any) {
                                    handleOnChangeFreeAppointement(e)
                            }}>
                                
                                <option value="false">No</option>
                                <option value="true">Yes</option>

                            </select>
                
                        </div>

                    </motion.div>
                    // #endregion

                )

            }

        </>

    )
    
}