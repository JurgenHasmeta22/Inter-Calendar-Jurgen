export default interface IModal {
  id?: number;
  price: number;
  title: string;
  description: string;
  doctor_id: number | null;
  user_id: number | null;
  category_id: number | null;
  startDate: string;
  endDate: string;
}
