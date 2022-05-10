export default interface IAppointement
{
	id?: number,
    price: number,
    title: string,
    status: number,
    user_id: number,
    doctor_id: number,
    category_id: number,
    description: string,
    dateStart: string,
    dateEnd: string
} 