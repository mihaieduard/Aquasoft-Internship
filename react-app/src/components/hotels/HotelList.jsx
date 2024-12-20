// src/components/hotels/HotelList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`/api/hotels/${id}`);
      fetchHotels();
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              {(user?.role === 'ADMINISTRATOR' || 
                user?.role === 'HOTEL_MANAGER' || 
                user?.role === 'GROUP_MANAGER') && (
                <Button 
                  className="mt-2"
                  variant="destructive"
                  onClick={() => deleteHotel(hotel.id)}
                >
                  Delete
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// src/components/hotels/HotelManager.jsx
const HotelManager = () => {
  const [managedHotels, setManagedHotels] = useState([]);

  useEffect(() => {
    const fetchManagedHotels = async () => {
      try {
        const response = await axios.get('/api/hotel-manager/hotels');
        setManagedHotels(response.data);
      } catch (error) {
        console.error('Error fetching managed hotels:', error);
      }
    };

    fetchManagedHotels();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Managed Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {managedHotels.map((hotel) => (
          <Card key={hotel.id}>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <Button 
                className="mt-2"
                onClick={() => {/* Add edit functionality */}}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { HotelList, HotelManager };