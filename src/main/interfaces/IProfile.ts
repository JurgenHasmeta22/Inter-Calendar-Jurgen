import IAppointement from "./IAppointement";
import IEvent from "../interfaces/IEvent"
import IUser from "./IUser";
import { DateSelectArg, EventClickArg } from "@fullcalendar/react";

export default interface IDashboard
{
	appointements: IAppointement[]
	modal: string
	eventsNew: IEvent[]
	doctors: IUser[]
	selectedDoctorName: string
	selectedDoctor: IUser | null
	selectInfo: DateSelectArg | null
	eventClick: EventClickArg | null
}