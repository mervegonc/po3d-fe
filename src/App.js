import React from 'react';
import "./index.css";  // index.css dosyanın dahil olduğundan emin ol

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ModelSelectionPage from './pages/ModelSelectionPage/ModelSelectionPage';
import AuthPage from './pages/LoginPage/AuthPage';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/ProductPage/ProductPage';
import AboutPage from './pages/AboutPage/AboutPage';
import HelpPage from './pages/HelpPage/HelpPage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/model" element={<ModelSelectionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
