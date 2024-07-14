interface IDevice {
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

interface IInterface {
  ImacAddress: string;
  Intname: string | null;
  ipAddress: string | null;
  speed: number;
  status: boolean;
  DMACaddress: string | null;
}