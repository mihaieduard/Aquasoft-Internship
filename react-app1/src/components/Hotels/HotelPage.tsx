import React, { useEffect, useState } from 'react';
import { getAllHotels, getHotelByName } from '../../services/hotelService';  // Assuming your service is set up as before
import { Card, CardContent, Typography, Grid, CircularProgress, TextField, Button } from '@mui/material';

const HotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);  // Holds the hotels data
  const [loading, setLoading] = useState<boolean>(true);  // Tracks loading state
  const [error, setError] = useState<string | null>(null);  // Error state
  const [searchName, setSearchName] = useState<string>('');  // State for search input
  const [searchedHotel, setSearchedHotel] = useState<any | null>(null);  // State for the searched hotel

  // Fetch hotels data when the page is loaded
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getAllHotels();  // Get hotels using the service
        setHotels(data);  // Update state with fetched hotels
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Failed to fetch hotels');
      } finally {
        setLoading(false);  // Stop loading state
      }
    };

    fetchHotels();  // Fetch hotels when the page loads
  }, []);

  // Function to search for a hotel by name
  const handleSearch = async () => {
    if (searchName) {
      try {
        const data = await getHotelByName(searchName);  // Fetch the hotel by name
        setSearchedHotel(data);  // Set the searched hotel in state
      } catch (error) {
        console.error('Error searching hotel:', error);
        setError('Failed to find hotel');
      }
    } else {
      setError('Please enter a hotel name');
    }
  };

  return (
    <div>
      <h1>Hotels List</h1>

      {/* Search Input */}
      <TextField
        label="Search Hotel by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Search
      </Button>

      {/* Error message if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Display searched hotel */}
      {searchedHotel && (
        <div style={{ marginTop: '20px' }}>
          <h2>Hotel Found</h2>
          <Card>
            <CardContent>
              <Typography variant="h6">{searchedHotel.name}</Typography>
              <Typography variant="body1">Hotel Name: {searchedHotel.HotelName}</Typography>
              <Typography variant="body2">Latitude: {searchedHotel.Latitude}</Typography>
              <Typography variant="body2">Longitude: {searchedHotel.Longitude}</Typography>
              <Typography variant="body2">RegionID: {searchedHotel.RegionID}</Typography>
              <Typography variant="body2">CityID: {searchedHotel.CityID}</Typography>
              <Typography variant="body2">Address: {searchedHotel.Address}</Typography>
              <Typography variant="body2">GroupID: {searchedHotel.GroupID}</Typography>
              <Typography variant="body2">ManagerId: {searchedHotel.ManagerId}</Typography>
              <Typography variant="body2">ManagerGroupId: {searchedHotel.ManagerGroupId}</Typography>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {hotels.map((hotel: any) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{hotel.name}</Typography>
                  <Typography variant="body1">Hotel Name: {hotel.HotelName}</Typography>
                  <Typography variant="body2">Latitude: {hotel.Latitude}</Typography>
                  <Typography variant="body2">Longitude: {hotel.Longitude}</Typography>
                  <Typography variant="body2">RegionID: {hotel.RegionID}</Typography>
                  <Typography variant="body2">CityID: {hotel.CityID}</Typography>
                  <Typography variant="body2">Address: {hotel.Address}</Typography>
                  <Typography variant="body2">GroupID: {hotel.GroupID}</Typography>
                  <Typography variant="body2">ManagerId: {hotel.ManagerId}</Typography>
                  <Typography variant="body2">ManagerGroupId: {hotel.ManagerGroupId}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default HotelsPage;
