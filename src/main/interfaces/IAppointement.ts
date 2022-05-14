export default interface IAppointement
{
	id?: number,
    price: number,
    title: string,
    status: string,
    user_id: number,
    doctor_id: number,
    category_id: number,
    description: string,
    startDate: string,
    endDate: string
} 