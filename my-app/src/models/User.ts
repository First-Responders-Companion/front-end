export interface IContact {
  name: string;
  phone: string;
  email: string;
}

export default interface IUser {
  _id: string;
  username: string;
  online?: boolean;
  role: string;
  name: string;
  email: string;
  phone: string;
  sex: string;
  dob: number;
  address: string;
  conditions: string;
  medications: string;
  allergies: string;
  emergencyContacts: Array<IContact>;
  assignedToCity: boolean;
  vehicle?: string;
  hospital?: string;
}
