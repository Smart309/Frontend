export interface IDevice {
  _id: string;
  hostname: string;
  ip_address: string;
  snmp_port: string;
  snmp_version: string;
  snmp_community: string;
  hostgroup: string;
  details: DeviceDetails;
  items: Item[];
  status: number;
}

export interface DeviceDetails {
  location: string;
  Room: string;
  serialNo: string;
  os: string;
  type: string;
  vendor: string;
  hardware: string;
}

export interface Item {
  name_item: string;
  oid: string;
  type: string;
  unit: string;
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

