import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './HomePage';
import MessagePage from './MessagePage';
import KudosPage from './KudosPage';

const App = () => {
  return (
    <Router>
    <div className="App w-full flex flex-col justify-center items-center p-5 min-h-screen">
      <div className="w-full max-w-5xl">
      <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/message" element={<MessagePage/>} />
            <Route path="/kudos" element={<KudosPage/>} />
          </Routes>
      </div>
    </div>
    </Router>
  );
};

export default App;