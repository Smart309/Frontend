import axios from "axios";
import { IDetails } from "../interface/IDetails";
// import { IDevice } from "../interface/IDevice";

const getDetailsData = async (): Promise<IDetails[]> => {
  try {
    const response = await axios.get<IDetails[]>(
      "http://localhost:3000/getDetails"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Details data:", error);
    throw new Error("Failed to fetch Details data. Please try again later.");
  }
};

export { getDetailsData };
