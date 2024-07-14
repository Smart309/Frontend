export interface IDevice {
  DMACaddress: string;
  Dname: string | null;
  location: string | null;
  hardware: string | null;
  os: string | null;
  type: string | null;
  vendor: string | null;
  room: string | null;
  status: boolean;
}

export interface IInterface {
  ImacAddress: string;
  Intname: string | null;
  ipAddress: string | null;
  speed: number;
  status: boolean;
  DMACaddress: string;
}

export interface IAlert {
  problem: string;
  problemStatus: boolean;
  alertDetail: string | null;
  area: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  password: string;
  role: string;
}

export interface IGraph {
  GID: String;
  DMACaddress: string;
  name: string | null;
  detail: string | null;
}
