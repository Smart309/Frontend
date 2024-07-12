import axios from "axios";
// import { IDevice } from "../interface/IDevice";

const getDeviceData = async (): Promise<IDevice | null> => {
  try {
    const response = await axios.get<IDevice[]>(
      "http://localhost:3000/getDevice"
    );
    if (response.data.length > 0) {
      return response.data[0]; // Get the first device for now
    } else {
      throw new Error("No devices found");
    }
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw new Error("Failed to fetch device data. Please try again later.");
  }
};

export { getDeviceData };
