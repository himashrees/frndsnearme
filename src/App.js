import React, { useState } from 'react';
import Login from './Login';
import Search from './Slider';
import './Style.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  // handle successful login
  const handleLogin = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
  }

  // handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <Search userData={userData} handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;