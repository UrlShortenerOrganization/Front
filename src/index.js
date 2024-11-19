import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import URLShortener from './App';
import InvalidLinkPage from './InvalidLinkPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<URLShortener />} />
        <Route path="/invalid-link" element={<InvalidLinkPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
