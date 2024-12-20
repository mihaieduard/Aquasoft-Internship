import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAllUsers = async () => {
  const token = localStorage.getItem('token'); // Get the stored JWT token
  if (!token) {
    throw new Error('No token found. Please log in.');
  }

  try {
    const response = await axios.get(`${API_URL}/admins`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request header
      },
    });
    return response.data; // assuming the data returned is an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: any) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await axios.put(`${API_URL}/admins/${userId}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
            },
        });
        return response.data; // assuming the data returned is the updated user object
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
  
export const deleteUser = async (userId: string) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await axios.delete(`${API_URL}/admins/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
            },
        });
        return response.data; // assuming the data returned is the deleted user object
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const getUserByName = async (name: string) => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    try {
      const response = await axios.get(`${API_URL}/admins/${name}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
            },
        });
        return response.data; // assuming the data returned is the user object
    } catch (error) {
        console.error('Error fetching user by name:', error);
        throw error;
    }
    }
