import axios from 'axios';
import { IEvent } from '../interface/IDevice';

const API_URL = "http://localhost:3000/event"; 

export const getEventData = async (): Promise<IEvent[]> => {
    try {
      const response = await axios.get(API_URL);
      console.log('Fetched Event Data:', response.data);  // Log the response to inspect it
  
      // Assuming response.data contains an object with a 'data' property which is an array
      const eventData = response.data.data;
  
      if (Array.isArray(eventData)) {
        return eventData;  // If data is an array, return it
      } else if (eventData && eventData._id) {
        return [eventData];  // If it's a single object, wrap it in an array
      } else {
        console.error('Invalid event format', eventData);
        throw new Error('Invalid event format');
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      throw error;
    }
  };
  