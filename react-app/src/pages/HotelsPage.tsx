import React, { useEffect, useState } from 'react';

const HotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]); // State pentru lista de hoteluri
  const [error, setError] = useState<string>(''); // State pentru a captura erorile
  const [loading, setLoading] = useState<boolean>(true); // State pentru a gestiona starea de încărcare

  useEffect(() => {
    // Funcție pentru a obține hotelurile
    const fetchHotels = async () => {
      const token = localStorage.getItem('access_token'); // Obține token-ul JWT din localStorage

      if (!token) {
        setError('You must be logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/hotels', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Trimite token-ul în header pentru autentificare
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data); // Setează hotelurile în state
      } catch (err) {
        setError('Failed to fetch hotels');
      } finally {
        setLoading(false); // Oprește starea de încărcare
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <p>Loading hotels...</p>; // Mesaj de încărcare
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Mesaj de eroare
  }

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.length === 0 ? (
        <p>No hotels available.</p> // Dacă nu sunt hoteluri
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id}>{hotel.name}</li> // Afișează numele hotelului
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelsPage;
