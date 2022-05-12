import IAppointement from "./IAppointement";
import IEvent from "../interfaces/IEvent"
import IUser from "./IUser";

export default interface IDashboard
{
	appointements: IAppointement[]
	openModal: boolean
	eventsNew: IEvent[]
	doctors: IUser[]
	selectedDoctorName: string
	selectedDoctor: IUser | null
} 