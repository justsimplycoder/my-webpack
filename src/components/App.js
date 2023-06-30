import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Home from '../pages//Home';
import PageNotFound from '../pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;