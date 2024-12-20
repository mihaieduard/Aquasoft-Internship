import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAllHotels = async () => {
  const token = localStorage.getItem('token'); // Get the stored JWT token
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  try {
    const response = await axios.get(`${API_URL}/hotels`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request header
      },
    });
    return response.data;  // assuming the data returned is an array of hotels
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};


export const getHotelByName = async (name: string) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
        throw new Error('No token found. Please log in.');
    }
    
    try {
        const response = await axios.get(`${API_URL}/hotels/${name}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
        },
        });
        return response.data; // assuming the data returned is the hotel object
    } catch (error) {
        console.error('Error fetching hotel by name:', error);
        throw error;
    }
    }

    export const getBestOffersFromNearbyHotels = async (airportId: string, radius: string) => {
        const token = localStorage.getItem('token'); // Get the stored JWT token
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
      
        try {
          const response = await axios.get(`${API_URL}/hotels/nearby-offers`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              airportId, // Send the airportId and radius as query params
              radius,
            },
          });
      
          return response.data; // assuming the data returned is the offers
        } catch (error) {
          console.error('Error fetching nearby offers:', error);
          throw error;
        }
      };

      // hotelService.ts

export const createHotel = async (hotelData: any) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
  
    try {
      const response = await axios.post(`${API_URL}/hotels`, hotelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; // assuming the response contains the created hotel data
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw error;
    }
  };
  
  // hotelService.ts

export const updateHotel = async (id: number, hotelData: any) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
  
    try {
      const response = await axios.patch(`${API_URL}/hotels/${id}`, hotelData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; // assuming the response contains the updated hotel data
    } catch (error) {
      console.error('Error updating hotel:', error);
      throw error;
    }
  };
  
  // hotelService.ts

export const deleteHotel = async (id: number) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
  
    try {
      const response = await axios.delete(`${API_URL}/hotels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data; // assuming the response indicates success or contains the deleted hotel data
    } catch (error) {
      console.error('Error deleting hotel:', error);
      throw error;
    }
  };
  