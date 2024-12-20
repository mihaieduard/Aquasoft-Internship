import React, { useState, useEffect } from 'react';
import './HotelsList.css'; // Importă fișierul CSS

const HotelsList: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('You must be logged in');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/hotels', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data);
      } catch (err) {
        setError('Failed to fetch hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <p className="loading">Loading hotels...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="hotels-container">
      <h2>Hotels</h2>
      {hotels.length === 0 ? (
        <p>No hotels available.</p>
      ) : (
        <ul>
          {hotels.map((hotel: any) => (
            <li key={hotel.HotelID} className="hotel-item">
              <h3>{hotel.HotelName}</h3>
              <p className="address">Address: {hotel.Address}</p>
              <p>Latitude: {hotel.Latitude}</p>
              <p>Longitude: {hotel.Longitude}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotelsList;
