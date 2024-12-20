import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        margin: 0,
      }}
    >
      <h1>Welcome to the Hotel Management App</h1>
      <p>Manage hotels, users, and more with ease.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login" style={{ marginRight: '10px' }}>
          <button>Login</button>
        </Link>
        <Link to="/register" style={{ marginRight: '10px' }}>
          <button>Register</button>
        </Link>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
