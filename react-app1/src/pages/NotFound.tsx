import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button>Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
