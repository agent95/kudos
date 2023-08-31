import React, { useState } from 'react';
import axios from 'axios';

const KudosPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('/api/login', { username, password })
      .then((response) => {
        console.log('Login successful', response.data);
        // Save the user data or token in your frontend state for future authenticated requests
      })
      .catch((error) => {
        console.error('Login failed', error.response.data);
      });
  };

  const handleTransfer = () => {
    const senderId = 1; // Assuming you have a logged-in user and their ID is 1
    const receiverId = 2; // Assuming the recipient's ID is 2
    const amount = 100; // Amount to transfer

    axios.post('/api/transfer', { senderId, receiverId, amount })
      .then((response) => {
        console.log('Transfer successful', response.data);
      })
      .catch((error) => {
        console.error('Transfer failed', error.response.data);
      });
  };

  return (
    <div>
      <h1>Money Transfer App</h1>
      <div>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button onClick={handleTransfer}>Transfer Money</button>
      </div>
    </div>
  );
}

export default KudosPage;
