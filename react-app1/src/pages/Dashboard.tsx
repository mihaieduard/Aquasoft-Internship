import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Card, CardContent, Typography, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllHotels } from '../services/hotelService';
import { getAllUsers, getUserByName, deleteUser, updateUser } from '../services/userService';

const Dashboard: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showUsers, setShowUsers] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null); // Store the search result
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editUserData, setEditUserData] = useState<any>({});
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getAllHotels();
        setHotels(data);
      } catch (error) {
        console.error('Failed to fetch hotels', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    const roleData = localStorage.getItem('userRole');
    if (roleData) {
      setUserRole(JSON.parse(roleData).RoleName);
    }

    fetchHotels();
    fetchUsers();
  }, []);

  const handleManageUsers = () => {
    setShowUsers(true);
  };

  const handleSearchUser = async () => {
    if (!searchName.trim()) {
      alert('Please enter a name to search');
      return;
    }
    try {
      const user = await getUserByName(searchName);
      setSearchResult(user); // Set the search result
    } catch (error) {
      console.error('Failed to fetch user by name:', error);
      alert('User not found');
    }
  };

  const handleCloseSearchResult = () => {
    setSearchResult(null);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user: any) => user.id !== parseInt(id)));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setEditUserData({ ...user });
  };

  const handleSaveEdit = async () => {
    try {
      await updateUser(editingUser.id, editUserData);
      setUsers(users.map((user: any) => (user.id === editingUser.id ? { ...editUserData } : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUserData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleGoToHotels = () => {
    navigate('/hotels'); // Redirects to hotels page
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Dashboard</h1>
      {userRole && <h2>Role: {userRole}</h2>}

      <ul>
        {hotels.map((hotel: any) => (
          <li key={hotel.id}>{hotel.name}</li>
        ))}
      </ul>

      {userRole === 'Administrator' && (
        <div>
          <Button variant="contained" onClick={handleGoToHotels}>
            Hotels
          </Button>

          <Button variant="contained" onClick={handleManageUsers} sx={{ marginTop: 2 }}>
            Manage Users
          </Button>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            sx={{ marginTop: 2, marginLeft: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSearchUser}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Search
          </Button>
        </div>
      )}

      {showUsers && (
        <div>
          <h2>Users List</h2>
          <Grid container spacing={2}>
            {users.map((user: any) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">ID: {user.id}</Typography>
                    <Typography variant="body1">
                      Name: {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2">Email: {user.email}</Typography>
                    <Typography variant="body2">Role ID: {user.RoleId}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditUser(user)}
                      sx={{ marginTop: 2 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id.toString())}
                      sx={{ marginTop: 2, marginLeft: 2 }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Modal for editing a user */}
      {editingUser && (
        <Modal open={true} onClose={() => setEditingUser(null)}>
          <Box
            sx={{
              padding: 4,
              backgroundColor: 'white',
              margin: 'auto',
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <h2>Edit User</h2>
            <TextField
              label="First Name"
              name="firstName"
              value={editUserData.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editUserData.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editUserData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Role ID"
              name="RoleId"
              value={editUserData.RoleId}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Box>
        </Modal>
      )}

      {/* Modal for search result */}
      {searchResult && (
        <Modal open={true} onClose={handleCloseSearchResult}>
          <Box
            sx={{
              padding: 4,
              backgroundColor: 'white',
              margin: 'auto',
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">ID: {searchResult.id}</Typography>
            <Typography variant="body1">
              Name: {searchResult.firstName} {searchResult.lastName}
            </Typography>
            <Typography variant="body2">Email: {searchResult.email}</Typography>
            <Typography variant="body2">Role ID: {searchResult.RoleId}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseSearchResult}
              sx={{ marginTop: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
