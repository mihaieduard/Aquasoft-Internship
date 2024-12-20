import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/auth'; // URL-ul aplicației NestJS

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Returnează răspunsul serverului
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
