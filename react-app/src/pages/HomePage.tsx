import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelsList from '../components/HotelsList';

const HomePage: React.FC = () => {
  const [showHotels, setShowHotels] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string | null>(localStorage.getItem('first_name'));
  const [lastName, setLastName] = useState<string | null>(localStorage.getItem('last_name'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  
  const navigate = useNavigate(); // Hook pentru navigare

  useEffect(() => {
    const handleStorageChange = () => {
      setFirstName(localStorage.getItem('first_name'));
      setLastName(localStorage.getItem('last_name'));
      setEmail(localStorage.getItem('email'));
      setRole(localStorage.getItem('role'));
      setToken(localStorage.getItem('access_token'));
    };

    // Adăugăm un listener pentru a asculta modificările din localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleShowHotels = () => {
    setShowHotels((prev) => !prev); // Alternăm între true și false
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found');
        return;
      }

      // Trimite cererea POST pentru logout
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Verificăm răspunsul serverului
      if (response.ok) {
        console.log('Logout successful');
        
        // Ștergem datele din localStorage și actualizăm stările
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.removeItem('access_token');
        
        // Redirecționăm utilizatorul la login
        navigate('/auth/login');
      } else {
        console.error('Logout failed: ', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the homepage</h1>
      {firstName && lastName && email && role && token ? (
        <div>
          <p>
            Logged in as: {firstName} {lastName} ({email})
          </p>
          <p>Role: {role}</p>

          <button onClick={handleShowHotels}>
            {showHotels ? 'Hide Hotels' : 'Show Hotels'}
          </button>
          {showHotels && <HotelsList />}

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to see the content</p>
      )}
    </div>
  );
};

export default HomePage;
