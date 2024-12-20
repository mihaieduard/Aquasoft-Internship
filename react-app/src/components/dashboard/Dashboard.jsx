// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalHotels: 0,
    nearbyOffers: [],
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [hotelsResponse, offersResponse] = await Promise.all([
          axios.get('/api/hotels'),
          axios.get('/api/hotels/nearby-offers?airportId=1&radius=50')
        ]);

        // Transform booking data for the chart
        const bookingData = Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          bookings: Math.floor(Math.random() * 50) // Replace with actual booking data
        })).reverse();

        setStats({
          totalHotels: hotelsResponse.data.length,
          nearbyOffers: offersResponse.data,
          recentBookings: bookingData
        });
      } catch (error) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-96">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Hotels</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalHotels}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Nearby Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {stats.nearbyOffers.map((offer, index) => (
                <li key={index} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                  <span>{offer.hotelName}</span>
                  <span className="font-semibold">${offer.price}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Available Rooms: {Math.floor(Math.random() * 100)}</p>
              <p>Today's Bookings: {Math.floor(Math.random() * 20)}</p>
              <p>Average Occupancy: {Math.floor(Math.random() * 100)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.recentBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;