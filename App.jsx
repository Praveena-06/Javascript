
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import PostDetails from './PostDetails';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
