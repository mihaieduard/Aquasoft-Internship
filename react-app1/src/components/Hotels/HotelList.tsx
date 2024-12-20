import React, { useEffect, useState } from 'react';
import { getAllHotels } from '../../services/hotelService';
import { Link } from 'react-router-dom';

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getAllHotels();
        setHotels(data);
      } catch (error) {
        console.error('Failed to fetch hotels', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Hotel List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {hotels.map((hotel: any) => (
          <li key={hotel.id} style={{ margin: '10px 0' }}>
            <Link to={`/hotels/${hotel.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
              {hotel.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
