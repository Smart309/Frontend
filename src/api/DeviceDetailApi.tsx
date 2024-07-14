import axios from "axios";
<<<<<<< HEAD
import { IDevice } from "../interface/IDevice";
// import { IDevice } from "../interface/IDevice";
=======
>>>>>>> feature/Devices

const getDeviceData = async (): Promise<IDevice[]> => {
  try {
    const response = await axios.get<IDevice[]>(
      "http://localhost:3000/getDevice"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw new Error("Failed to fetch device data. Please try again later.");
  }
};

export { getDeviceData };
