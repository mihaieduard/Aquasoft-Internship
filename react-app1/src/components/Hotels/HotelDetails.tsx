import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelByName } from '../../services/hotelService';

const HotelDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const data = await getHotelByName(name as string);
        setHotel(data);
      } catch (error) {
        console.error('Failed to fetch hotel details', error);
      }
    };
    fetchHotelDetails();
  }, [name]);

  if (!hotel) {
    return <p>Loading hotel details...</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <p>Location: {hotel.location}</p>
      <p>Price: {hotel.price}</p>
    </div>
  );
};

export default HotelDetails;
