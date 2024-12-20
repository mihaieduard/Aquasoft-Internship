import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const { user, access_token } = await login(email, password);
        localStorage.setItem('token', access_token);
        localStorage.setItem('userRole', JSON.stringify(user.role)); // Store role info
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed', error);
      }
    };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#242424', // Dark background for the page
    padding: '20px',
  },
  card: {
    backgroundColor: '#333333', // Darker card background
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    color: '#ffffff', // Light text for the title
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #444', // Darker border color
    backgroundColor: '#555', // Darker input background
    color: '#ffffff', // Light text color inside input
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    marginTop: '10px',
    backgroundColor: '#646cff', // Light button color for contrast
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default Login;
