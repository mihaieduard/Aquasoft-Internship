// src/components/hotels/HotelDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HotelDetails = () => {
  const { name } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [occupancyData, setOccupancyData] = useState([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/hotels/${name}`);
        setHotel(response.data);
        
        // Generate mock occupancy data
        const mockData = Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          occupancy: Math.floor(Math.random() * 100)
        })).reverse();
        setOccupancyData(mockData);
      } catch (error) {
        setError('Failed to fetch hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [name]);

  if (loading) return <div className="flex justify-center items-center h-96">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!hotel) return <div className="text-center">Hotel not found</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{hotel.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Hotel Information</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd>{hotel.location}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Total Rooms</dt>
                  <dd>{hotel.totalRooms}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Price Range</dt>
                  <dd>{hotel.priceRange}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{hotel.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Occupancy Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelDetails;