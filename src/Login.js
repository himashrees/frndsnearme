import React, { useState } from 'react';
import axios from 'axios';

function Login({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/locations/userlogin', { username, password })
      .then(response => {
        console.log(response.data);
        handleLogin(response.data);
      })
      .catch(error => {
        console.log(error);
        setErrorMsg('Invalid credentials');
      });
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;