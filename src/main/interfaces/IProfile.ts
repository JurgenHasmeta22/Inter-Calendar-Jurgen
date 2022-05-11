import IAppointement from "./IAppointement";
import IEvent from "../interfaces/IEvent"

export default interface IDashboard
{
	appointements: IAppointement[],
	openModal: boolean,
	eventsNew: IEvent[]
} 