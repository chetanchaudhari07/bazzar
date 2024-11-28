import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Signup() {
  const [username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const userData = { username, Email, password};

    try {
     
      const response = await axios.post('http://localhost:5000/users/register', userData);
      
      
      console.log(response.data.message); 
      navigate('/login'); 
    } catch (err) {
      setError('Error registering user');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

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
          <label htmlFor="Email">Email:</label>
          <input
            type="text"
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
}

export default Signup;
