import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loginData = { username, password };

    try {
      
      const response = await axios.post('http://localhost:5000/users/login', loginData);

      
      const { token, role ,userId } = response.data;
      localStorage.setItem('token', token);  
      localStorage.setItem('role', role);
      localStorage.setItem('user',userId); 

      console.log('Login successful:', response.data); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
}

export default Login;
