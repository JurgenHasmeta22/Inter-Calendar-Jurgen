interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  userName: string;
  bio: string;
  password?: string;
  avatar: string;
  isDoctor: string;
  postedAppointements: any;
  acceptedAppointemets: any;
  freeAppointements: any;
}

export default IUser;
