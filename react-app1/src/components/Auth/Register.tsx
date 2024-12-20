import React, { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await register(email, password);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', margin: '10px auto', padding: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', margin: '10px auto', padding: '10px' }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        style={{ display: 'block', margin: '10px auto', padding: '10px' }}
      />
      <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>Register</button>
    </form>
  );
};

export default Register;
